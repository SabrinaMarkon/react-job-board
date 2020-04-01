import React, { useState, useEffect } from 'react';
import './App.css';
import Jobs from './Jobs';

// We SEE the job site on port 3000 but it fetches the jobs from port 3001!
const JOB_API_URL = 'http://localhost:3001/jobs'; // api/index.js url! (local dev environment).
// const JOB_API_URL = 'http://sabrinamarkon.com:3001/jobs'; // api/index.js url!

async function fetchJobs(callbackSetJobsList) {
  const response = await fetch(JOB_API_URL);
  const json = await response.json();
  callbackSetJobsList(json);
}

// App component will hold state.
function App() {

  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    fetchJobs(setJobsList).catch(e => 
      console.log(`Error with fetchJobs call: ${e}`));
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;
