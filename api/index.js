// backend
const express = require('express');
const app = express();
const port = 3001;

const redis = require('redis');
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client); // Get jobs from redis.
// const setAsync = promisify(client.set).bind(client); // Add jobs to redis (SET).

app.get('/jobs', async (req, res) => { 
  const jobs = await getAsync('github').catch((e) => console.log('Error: ', e.message));
  // console.log(JSON.parse(jobs).length);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // CORS.
  return res.send(jobs);
});

// catch-all
app.get('*', (req, res) => {
  res.send('404 Not Found');
});

app.listen(port, () => console.log(`Job app server listening on port ${port}!`));