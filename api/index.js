// backend
const express = require('express');
const app = express();
const port = 3001;
const redis = require('redis');
let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient();
}
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client); // Get jobs from redis.
// const setAsync = promisify(client.set).bind(client); // Add jobs to redis (SET).

// /jobs here is at port 3001! The http is port 3000 that we see!
app.get('/jobs', async (req, res) => { 
  let jobs = await getAsync('github').catch((e) => console.log('Error with getAsync(): ', e.message));
  console.log(JSON.parse(jobs).length);
  jobs = JSON.parse(jobs);
  for (job in jobs) {
    console.log(job,jobs[job].title);
  }
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // CORS (local dev environment).
  // res.header("Access-Control-Allow-Origin", "http://sabrinamarkon.com:3000"); // CORS.
  return res.send(jobs);
});

// catch-all
app.get('*', (req, res) => {
  res.send('404 Not Found');
});

app.listen(port, () => console.log(`Job app server listening on port ${port}!`));