const _ = require('lodash');

/**
 * Pluck
 * Pulls query parameters off of the request.query object
 * and re-appends them back to the request object for easy access
 * @param req The HTTP request object
 * @returns {function(...[*]=)} a function that takes in a parameter to
 * search for in the request query params
 */
const pluck = (req) => (param) => {
  if (req.query[param]) {
    req[param] = req.query[param];
  }
};

/**
 * Parameter Plucker
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next Next() Middleware function
 * @returns {*} None
 */
module.exports = (req, res, next) => {
  if (_.isEmpty(req.query)) {
    // No parameters were passed in - return response of 400
    res
      .status(400)
      .json({ message: 'No query parameters were provided in the request' });
    return next();
  }

  // Create a function from pluck that takes in a parameter object
  const replace = pluck(req);
  replace('id');
  replace('name');
  replace('projectId');
  replace('rewardId');
  next();
};
