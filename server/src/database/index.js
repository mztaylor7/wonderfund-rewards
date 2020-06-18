// eslint-disable-next-line import/no-extraneous-dependencies,node/no-extraneous-require
const Sequelize = require('sequelize');

/* Import Debug module
 *  These modules are used in place of 'console.log' to keep the terminal from being
 *  filled with unnecessary items during production runs
 * */
const dbDebug = require('debug')('database:startup');

/* Import Models */
const Project = require('../models/projectModel');
const Reward = require('../models/rewardModel');

/* Destructure out the environmental variables from process.env*/
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST
} = process.env;

// Connect to MySQL Database
const connection = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Init Database Connection
connection
  .authenticate()
  .then(() => {
    dbDebug('Connection has been established successfully.');
  })
  .catch((err) => {
    dbDebug('Unable to connect to the database:', err);
  });

/* Initialize Models */
const ProjectModel = Project.factory(connection);
const RewardModel = Reward.factory(connection);

/* Append Association Values to the Project Model for use when items are added ot the database */
ProjectModel.Rewards = ProjectModel.hasMany(RewardModel, { as: 'rewards' });

// Export the main Sequelize App & the db connection
module.exports.connection = connection;
module.exports.ProjectModel = ProjectModel;
module.exports.RewardModel = RewardModel;
