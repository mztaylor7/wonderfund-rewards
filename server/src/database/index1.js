require('dotenv').config();
const { redisClient, redis } = require('./redis.js');
const { Pool } = require('pg');

const connectionString = process.env.PGCONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
})

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
  redisClient.get(req.id, async (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (data) {
        res.send(data);
      } else {
          try {
            var getProjectQuery = {
              text: 'SELECT * FROM projects LEFT JOIN rewards ON projects.id = rewards.projectId WHERE projects.id = $1',
              values: [req.id]
            }
            await pool
              .query(getProjectQuery)
              .then((projects) => {
                res.status(200).json(projects.rows);
                var redisEntry = JSON.stringify(projects.rows);
                redisClient.set(req.id, redisEntry, (err) => {
                  if (err) console.log('Redis err: ', err)
                });
              })
              .catch(err => res.status(400).send(err))
          } catch (err) {
            res.status(500).send(err)
          }
      }
    }
  })
}

const getRewards = (req, res) => {
  var getRewardsQuery = {
    text: 'SELECT * FROM rewards where projectId = $1',
    values: [req.projectId]
  }
  pool
    .query(getRewardsQuery)
    .then(data => res.status(200).json(data.rows))
    .catch(err => res.status(400).send(err))
};

const createOneReward = (req, res) => {
  const params = filterBody(req);
  pool.query('INSERT INTO rewards (title, pledgeAmount, description, deliveryMonth, deliveryYear, rewardQuantity, projectId, rewardItems) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' [params.title, params.pledgeAmount, params.description, params.deliveryMonth, params.deliveryYear, params.rewardQuantity, params.projectId, params.rewardItems], (err, data) => {
    if (err) {
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
      res.status(400).send(err);
    }
    res.status(200).send(`Reward updated with projectId: ${params.projectId}`)
  })
}

const deleteOneReward = (req, res) => {
  const searchQuery = getSearchQuery(req);
  pool.query('DELETE FROM rewards WHERE projectId = $1', [(searchQuery.projectId || searchQuery.id)], (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(`Reward deleted with projectId: ${params.projectId}`)
  })
}

// const checkCache = (req, res, next) => {
//   redisClient.hgetall(req.id, async (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       if (data !== null) {
//         res.send(data);
//       } else {
//         (req, res) => {
//           try {
//             const
//           }
//         }
//       }
//     }
//   })
// }

module.exports = {
  getRewards,
  createOneReward,
  updateOneReward,
  deleteOneReward,
  getOneProject,
}