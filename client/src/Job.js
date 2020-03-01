import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function Job({id,job}) {
  return (
    <Paper className={'job'}>
      <div>{id}</div>
      <div>{job.title}</div>
      <div>{job.company}</div>
    </Paper>
  )
}