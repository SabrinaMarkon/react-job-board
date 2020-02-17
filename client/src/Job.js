import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function Job({job}) {
  return (
    <Paper className={'job'}>
      <div>{job.title}</div>
      <div>{job.company}</div>
    </Paper>
  )
}