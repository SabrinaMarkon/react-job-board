import React, { useState, useEffect } from 'react';
import './App.css';
import Jobs from './Jobs';

const JOB_API_URL = 'http://localhost:3001/jobs';

// const mockJobs = [
//   {title: 'Front-end Developer', company: 'Google'},
//   {title: 'Java Developer', company: 'Microsoft'},
//   {title: 'UI/UX Designer', company: 'GitHub'}
// ];

// App component will hold state.
function App() {

  const [jobsList, setJobsList] = useState([]);

  async function fetchJobs(newJobsList) {
    const response = await fetch(JOB_API_URL);
    const json = await response.json();
    console.log(json);
    setJobsList(newJobsList);
  }

  useEffect((jobsList) => {
    fetchJobs(jobsList);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;
