# react-job-board
A job board in React with hooks that pulls and filters job notices from online APIs.

GET READY:

In the root of the project:
npm install cron
npm install redis
npm install express
npm install @material-ui/icons

In /client, install MaterialUI:
// with npm
npm install @material-ui/core
// with yarn
yarn add @material-ui/core

-------------------------------------------------

REDIS SETUP:

How to run Redis on Windows:

1) Download Memurai (free) - "Redis-compatible cache and datastore for Windows" at memurai.com
2) Install with the .msi.
3) Find the installation folder (mine was C:\\Program Files\Memurai\
4) Open the Windows command prompt and cd into that folder and run memurai-cli
5) If everything worked out, you should see the Redis prompt as he shows us in the video.
6) Add to your Windows PATH if you want to run it without having to cd to the folder.

For Mac or Linux, install Redis, then use the redis-cli command (instead of the memurai-cli that Windows uses).

-------------------------------------------------

START PROJECT UP:

In /client, run:
npm run start (starts the frontend)

In root, run:
node worker/index.js (starts the cron service)

In root, run:
node api/index.js (starts the api - the express server)

