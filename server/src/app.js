/* Import Modules */
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const projectRouter = require('./routes/projectRoutes');
const rewardRouter = require('./routes/rewardRoutes');

// Initialize the app as our express framework
const app = express();

/* Security
 *  Set the cors headers of all request and responses
 *  Use helmet to add secure headers to each response
 *  Use xssClean to protect against xss attacks
 * */
app.use(cors());
app.use(helmet());
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
app.use(express.static('./', path.resolve(__dirname, '../../client/dist')));

/* This is to allow the app to send the dist html file no matter the params in the request */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

// Export the App module
module.exports = app;
