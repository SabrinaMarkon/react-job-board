// CronJob: seconds(0-59) minutes(0-59) hours(0-23) dayofmonth(1-31) month(0-11) dayofweek(0-6)
const CronJob = require('cron').CronJob;

// Functions to execute to fetch jobs from APIs:
const fetchGitHub = require('./tasks/fetch-github');
// const fetchIndeed = '';
// const fetchStackOverflow = '';

// All cronjobs can run in parallel and are independent of one another.
const job = new CronJob('0 */5 * * * *', fetchGitHub().catch(e => console.log(e)), null, true, 'America/Edmonton');
job.start();