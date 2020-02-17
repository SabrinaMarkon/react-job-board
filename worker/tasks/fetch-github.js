// node-fetch gives node the fetch method the same as client-side fetch.
const fetch = require('node-fetch');

// With no query string parameters, the default is the first 50 jobs.
const MAIN_API_URL = 'https://jobs.github.com/positions.json';

async function fetchGitHub() {
  let currentPageJobCount, pageWeAreOn = 0, totalJobCount = 0;
  const allJobs = [];
  
  do {
    const response = await fetch(`${MAIN_API_URL}?page=${pageWeAreOn}`);
    const jobs = await response.json();
    allJobs.push(jobs);
    currentPageJobCount = jobs.length;
    totalJobCount += currentPageJobCount;
    console.log('got', currentPageJobCount, 'jobs');
    pageWeAreOn++;
  } while (currentPageJobCount === 50);

  console.log('got total', totalJobCount, 'jobs');
}

fetchGitHub();

module.exports = fetchGitHub;
