// node-fetch gives node the fetch method the same as client-side fetch.
const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient();
const { promisify } = require("util"); // converts callbacks to promises.
// const getAsync = promisify(client.get).bind(client); // GET jobs from redis.
// The node utility promisify converts the client.set (which is async) operation 
// to a promise so we can make sure code runs in the order we want it to.
const setAsync = promisify(client.set).bind(client); // Add jobs to redis (SET).

// With no query string parameters, the default is the first 50 jobs.
const MAIN_API_URL = 'https://jobs.github.com/positions.json';

async function fetchGitHub() {
  console.log('Fetching GitHub jobs...');
  let currentPageJobCount, pageWeAreOn = 0, totalJobCount = 0;
  const allJobs = [];
  
  // Fetch all the pages.
  do {
    const response = await fetch(`${MAIN_API_URL}?page=${pageWeAreOn}`).catch(e => console.log('Error with fetch() call: ', e.message));
    const jobs = await response.json().catch(e => console.log('Error with response.json() call: ', e.message));
    // spread the array so allJobs doesn't become an array of arrays,
    // since jobs is itself an array:
    allJobs.push(...jobs);
    currentPageJobCount = jobs.length;
    console.log('got', currentPageJobCount, 'jobs');
    pageWeAreOn++;
  } while (currentPageJobCount === 50);

  console.log('\ngot total', allJobs.length, 'jobs');

  // Filter results.
  const juniorJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    const jobDescription = job.description.toLowerCase();
    return (!jobTitle.includes('senior') &&
      !jobTitle.includes('sr.') &&
      !jobTitle.includes('manager') &&
      !jobTitle.includes('architect') &&
      !jobDescription.includes('senior') &&
      !jobDescription.includes('sr.') &&
      !jobDescription.includes('manager') &&
      !jobDescription.includes('architect'));
  });

  console.log('Filtered down to', juniorJobs.length, 'junior level jobs');
  const success = await setAsync('github', JSON.stringify(juniorJobs));
  console.log(success + " Well hai thar, how are ya?");
}

// fetchGitHub(); // Called in worker/index.js cronjob.

module.exports = fetchGitHub;
