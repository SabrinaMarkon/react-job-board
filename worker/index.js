var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
  // Function will be here to fetch the job ads to populate the app.
}, null, true, 'America/Edmonton');
job.start();