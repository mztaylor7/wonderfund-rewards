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
    pledgeAmount: req.body.pledgeamount,
    description: req.body.description,
    deliveryMonth: req.body.deliverymonth,
    deliveryYear: req.body.deliveryyear,
    rewardQuantity: req.body.rewardquantity,
    projectId: req.body.projectId,
    rewardItems: req.body.rewarditems,
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

  if (req.id) {
    searchQuery.id = req.id;
  }

  return searchQuery;
};

const getOneProject = (req, res) => {
  const searchQuery = req.id;
  // SELECT * FROM (SELECT * FROM projects WHERE id = 9999999) a, (SELECT description FROM rewards WHERE projectId = 9999999 LIMIT 1) b;
  pool.query('SELECT * FROM projects LEFT JOIN rewards ON projects.id = rewards.projectId WHERE projects.id = $1 LIMIT 1', [searchQuery], (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.status(200).json(data.rows)
  })
}

const getRewards = (req, res) => {
  const searchQuery = getSearchQuery(req);
  pool.query('SELECT * FROM rewards where projectId = $1', [(searchQuery.projectId || searchQuery.id)], (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).json(data.rows)
  })
};

const createOneReward = (req, res) => {
  const params = filterBody(req);
  pool.query('INSERT INTO rewards (title, pledgeAmount, description, deliveryMonth, deliveryYear, rewardQuantity, projectId, rewardItems) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' [params.title, params.pledgeAmount, params.description, params.deliveryMonth, params.deliveryYear, params.rewardQuantity, params.projectId, params.rewardItems], (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(201).send(`Reward added with projectId: ${params.projectId}`)
  })
}

const updateOneReward = (req, res) => {
  const searchQuery = getSearchQuery(req);
  const params = filterBody(req);
  pool.query('UPDATE rewards SET title = $1, pledgeAmount = $2, description = $3, deliveryMonth = $4, deliveryYear = $5, rewardQuantity = $6, projectId = $7, rewardItems = $8', [params.title, params.pledgeAmount, params.description, params.deliveryMonth, params.deliveryYear, params.rewardQuantity, params.projectId, params.rewardItems], (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(`Reward updated with projectId: ${params.projectId}`)
  })
}

const deleteOneReward = (req, res) => {
  const searchQuery = getSearchQuery(req);
  pool.query('DELETE FROM rewards WHERE projectId = $1', [(searchQuery.projectId || searchQuery.id)], (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(`Reward deleted with projectId: ${params.projectId}`)
  })
}

module.exports = {
  getRewards,
  createOneReward,
  updateOneReward,
  deleteOneReward,
  getOneProject
}