/* Import Modules */
const path = require('path');
const express = require('express');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const projectRouter = require('./routes/projectRoutes');
const rewardRouter = require('./routes/rewardRoutes');

// Initialize the app as our express framework
const app = express();

/* Security
 *  Use xssClean to protect against xss attacks
 * */
app.use(xssClean());

// Allow the app to use the body-parser middleware so we can accept JSON body data
app.use(express.json({ limit: '10kb' })); //Limit body to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Form Parser

// Set a rate limiter to avoid API abuse - the current call size is 1000 calls per hour
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, //60 seconds * 60 minutes * 1000 = 3600000 milliseconds
  message: 'Too many requests from this IP, please try again in an hour.'
});

// All requests flowing into the /api route will be rate-limited
app.use('/api', limiter);
app.use('/api/projects', projectRouter);
app.use('/api/rewards', rewardRouter);

// Serve up the dist folder from the client at the defined PORT
app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));

// Export the App module
module.exports = app;
