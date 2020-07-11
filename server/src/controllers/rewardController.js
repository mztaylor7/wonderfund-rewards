const { getRewardModel } = require("../database");

/**
 * Filter Body
 * @param req the HTTP Request object
 * @returns {Object} An object with only the parameters we need from the request body
 */
const filterBody = (req) => {
  return {
    title: req.body.title,
    pledgeAmount: req.body.pledgeAmount,
    description: req.body.description,
    deliveryMonth: req.body.deliveryMonth,
    deliveryYear: req.body.deliveryYear,
    rewardItems: req.body.rewardItems,
    shippingType: req.body.shippingType,
    rewardQuantity: req.body.rewardQuantity,
    timeLimit: req.body.timeLimit,
    projectId: req.body.projectId
  };
};

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

/**
 * Create One Reward
 * @param req The HTTP Request Object
 * @param res The HTTP Response Object
 */
module.exports.createOneReward = (req, res) => {
  const RewardModel = getRewardModel();
  RewardModel.sync({ force: false })
    .then(() => {
      return RewardModel.create(filterBody(req));
    })
    .then((reward) => {
      res.status(200).send(reward);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

/**
 * Update One Reward
 * @param req The HTTP Request Object
 * @param res The HTTP Response Object
 */
module.exports.updateOneReward = (req, res) => {
  const RewardModel = getRewardModel();
  const searchQuery = getSearchQuery(req);
  const params = filterBody(req);
  RewardModel.update(params, { where: searchQuery }).then(() => {
    res.status(200).json(params);
  });

  // Errors from 'update' don't seem to be sent to the catch block - even if the database is closed.
};

/**
 * Delete One Reward
 * @param req The HTTP Request Object
 * @param res The HTTP Response Object
 */
module.exports.deleteOneReward = (req, res) => {
  const RewardModel = getRewardModel();
  const searchQuery = getSearchQuery(req);
  RewardModel.destroy({ where: searchQuery })
    .then(() => {
      res.status(200).json(searchQuery);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};