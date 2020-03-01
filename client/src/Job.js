import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function Job({id,job}) {
  return (
    <Paper className={'job'}>
      <div className="jobbox">
        {/* <Typography>{id}</Typography> */}
        <Typography variant="h6">{job.title}</Typography>
        <Typography>{job.company}</Typography>
        <Typography>{job.location}</Typography>
      </div>
      <div>
        <Typography>
          {job.created_at.split(' ').slice(0, 4).join(' ')}
        </Typography> 
      </div>
    </Paper>
  )
}