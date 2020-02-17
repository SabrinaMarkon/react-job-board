// node-fetch gives node the fetch method the same as client-side fetch.
const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client); // Get jobs from redis.
const setAsync = promisify(client.set).bind(client); // Add jobs to redis.

// With no query string parameters, the default is the first 50 jobs.
const MAIN_API_URL = 'https://jobs.github.com/positions.json';

async function fetchGitHub() {
  console.log('Fetching GitHub jobs...');
  let currentPageJobCount, pageWeAreOn = 0, totalJobCount = 0;
  const allJobs = [];
  
  // Fetch all the pages.
  do {
    const response = await fetch(`${MAIN_API_URL}?page=${pageWeAreOn}`).catch(e => console.log('Error: ', e.message));
    const jobs = await response.json().catch(e => console.log('Error: ', e.message));
    // spread the array so allJobs doesn't become an array of arrays,
    // since jobs is itself an array:
    allJobs.push(...jobs);
    currentPageJobCount = jobs.length;
    console.log('got', currentPageJobCount, 'jobs');
    pageWeAreOn++;
  } while (currentPageJobCount === 50);

  console.log('got total', allJobs.length, 'jobs');

  // Filter results.
  const juniorJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('architect')
    ) {
      return false;
    }
    return true;
  })

  console.log('Filtered down to', juniorJobs.length, 'junior level jobs');
  const success = await setAsync('github', JSON.stringify(allJobs));
  console.log(success);
}

// fetchGitHub(); // Called in worker/index.js cronjob.

module.exports = fetchGitHub;
