const _ = require('lodash');

const pluck = (req) => (param) => {
  if (req.query[param]) {
    req[param] = req.query[param];
  }
};

module.exports = (req, res, next) => {
  if (_.isEmpty(req.query)) {
    res
      .status(400)
      .json({ message: 'No query parameters were provided in the request' });
    return next();
  }

  const replace = pluck(req);
  replace('id');
  replace('name');
  replace('projectId');
  replace('rewardId');
  next();
};
