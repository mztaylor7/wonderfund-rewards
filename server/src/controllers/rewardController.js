const { getRewardModel } = require("../database");

/**
 * Get Search Query
 * @param req The HTTP Request object
 * @returns {{}} A query object containing either the id or title of a project - depending on
 * which was provided in the request.
 */
const getSearchQuery = (req) => {
  const searchQuery = {};
  if (req.projectId) {
    searchQuery.projectId = req.projectId;
  }

  if (req.rewardId) {
    searchQuery.id = req.rewardId;
  }

  return searchQuery;
};

/**
 * Get All Rewards
 * @param req The HTTP Request Object
 * @param res The HTTP Response Object
 */
module.exports.getRewards = (req, res) => {
  const RewardModel = getRewardModel();
  const searchQuery = getSearchQuery(req);

  RewardModel.findAll({ where: searchQuery })
    .then((rewards) => {
      res.status(200).json(rewards);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
