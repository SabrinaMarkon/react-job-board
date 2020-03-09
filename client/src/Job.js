import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function Job({id,job}) {
  let createdArray = job.created_at.split(' ');
  createdArray.splice(3, 2);
  let createdDate = createdArray.join(' ');
  return (
    <Paper className={'job'}>
      <div className="jobbox">
        {/* <Typography>{id}</Typography> */}
        <Typography variant="h6">{job.title}</Typography>
        <Typography>{job.company}</Typography>
        <Typography>{job.location}</Typography>
      </div>
      <div>
        <Typography>{createdDate}</Typography> 
      </div>
    </Paper>
  )
}