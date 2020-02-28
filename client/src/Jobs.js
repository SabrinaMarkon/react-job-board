import React from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './Job.js';

export default function Jobs({jobs}) {
  return (
    <div className="jobs">
      <Typography variant="h3">
        Entry Level Software Jobs for UoPeople Students
      </Typography>
      {
        jobs.map(
          (job, i) => <Job key={i} job={job} />
        )
      }
    </div>
  );
}