const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kickstarter',
  password: 'taylor',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

const filterBody = (req) => {
  return {
    id: req.body.id,
    title: req.body.title,
    pledgeArmount: req.body.pledgeAmount,
    description: req.body.description,
    deliveryMonth: req.body.deliveryMonth,
    deliveryYear: req.body.deliveryYear,
    shippingType: req.body.shippingType,
    rewardQuantity: req.body.rewardQuantity,
    timeLimit: req.body.timeLimit,
    projectId: req.body.projectId
    rewardItems: req.body.rewardItems,
  };
};

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

const getRewards = (req, res) => {
  const searchQuery = getSearchQuery(req);
  pool.query('SELECT * FROM rewards where projectId = $1', [(searchQuery.projectId || searchQuery.id)], (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.status(200).json(data.rows)
  })
};

const createOneReward = (req, res) => {
  const params = filterBody(req);
  pool.query('INSERT INTO rewards (title, pledgeArmount, description, deliveryMonth, deliveryYear, shippingType, rewardQuantity, timeLimit, projectId, rewardItems) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' [params.title, params.pledgeArmount, params.description, params.deliveryMonth, params.deliveryYear, params.shippingType, params.rewardQuantity, params.timeLimit, params.projectId, params.rewardItems], (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.status(201).send(`Reward added with projectId: ${params.projectId}`)
  })
}

const updateOneReward = (req, res) => {
  const searchQuery = getSearchQuery(req);
  const params = filterBody(req);
  pool.query('UPDATE rewards SET title = $1, pledgeArmount = $2, description = $3, deliveryMonth = $4, deliveryYear = $5, shippingType = $6, rewardQuantity = $7, timeLimit = $8, projectId = $9, rewardItems = $10', [params.title, params.pledgeArmount, params.description, params.deliveryMonth, params.deliveryYear, params.shippingType, params.rewardQuantity, params.timeLimit, params.projectId, params.rewardItems], (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.status(200).send(`Reward updated with projectId: ${params.projectId}`)
  })
}

const deleteOneReward = (req, res) => {
  const searchQuery = getSearchQuery(req);

  pool.query('DELETE FROM rewards WHERE projectId = $1', [(searchQuery.projectId || searchQuery.id)], (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.status(200).send(`Reward deleted with projectId: ${params.projectId}`)
  })
}

module.exports = {
  getRewards,
  createOneReward,
  updateOneReward,
  deleteOneReward
}