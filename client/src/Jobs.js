import React from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './Job.js';

export default function Jobs({jobs}) {
  return (
    <div className="App">
      <Typography variant="h3" component="h1">
        Entry Level Software Jobs for UoPeople Students
      </Typography>
      {
        jobs.map(
          (job, i) => <Job key={i} job={job} id={i} />
        )
      }
    </div>
  );
}