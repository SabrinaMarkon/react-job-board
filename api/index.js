// backend
const express = require('express');
const app = express();
const port = 3001;

app.get('/jobs', (req, res) => { 
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Job app server listening on port ${port}!`));