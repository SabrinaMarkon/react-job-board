import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function Job({id,job}) {
  return (
    <Paper className={'job'}>
      <Typography>{id}</Typography>
      <Typography>{job.title}</Typography>
      <Typography>{job.company}</Typography>
    </Paper>
  )
}