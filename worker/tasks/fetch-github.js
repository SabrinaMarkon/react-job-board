// node-fetch gives node the fetch method the same as client-side fetch.
const fetch = require('node-fetch');

// With no query string parameters, the default is the first 50 jobs.
const MAIN_API_URL = 'https://jobs.github.com/positions.json';

async function fetchGitHub() {
  let currentPageJobCount, pageWeAreOn = 0, totalJobCount = 0;
  const allJobs = [];
  
  do {
    const response = await fetch(`${MAIN_API_URL}?page=${pageWeAreOn}`).catch(e => console.log('Error: ', e.message));;
    const jobs = await response.json().catch(e => console.log('Error: ', e.message));;
    // spread the array so allJobs doesn't become an array of arrays,
    // since jobs is itself an array:
    allJobs.push(...jobs); 
    currentPageJobCount = jobs.length;
    console.log('got', currentPageJobCount, 'jobs');
    pageWeAreOn++;
  } while (currentPageJobCount === 50);

  console.log('got total', allJobs.length, 'jobs');
}

fetchGitHub();

module.exports = fetchGitHub;
