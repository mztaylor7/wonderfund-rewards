// eslint-disable-next-line import/no-extraneous-dependencies,node/no-extraneous-require
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

/* Import Models */
const Project = require('../models/projectModel');
const Reward = require('../models/rewardModel');

let ProjectModel;
let RewardModel;

module.exports.getProjectModel = () => {
  return ProjectModel;
};

module.exports.getRewardModel = () => {
  return RewardModel;
};

/**
 * Create Sequelize Connection
 * @returns {Promise<*>} A Promise that will eventually resolve with the connection and model
 * objects appended, or will reject with a connection error
 */
const createSequelizeConnection = () => {
  return new Promise((resolve, reject) => {
    /* Connect with base MySQL2 package and creat ethe database if it doesn't exist */
    const {
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_HOST
    } = process.env;

    mysql
      .createConnection({
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        host: DATABASE_HOST
      })
      .then((sqlRoot) => {
        sqlRoot
          .query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};`)
          .then(() => {
            // Connect to MySQL Database
            const connection = new Sequelize(
              DATABASE_NAME,
              DATABASE_USER,
              DATABASE_PASSWORD,
              {
                host: DATABASE_HOST,
                dialect: 'mysql',
                logging: false,
                pool: {
                  max: 5,
                  min: 0,
                  acquire: 30000,
                  idle: 10000
                }
              }
            );

            /* Create database connection for sequelize*/
            connection.authenticate().then(async () => {
              console.log('Connection has been established successfully.');

              /* Initialize Models */
              ProjectModel = Project.factory(connection);
              RewardModel = Reward.factory(connection);

              /* Append Association Values to the Project Model for use when items are added ot the database */
              ProjectModel.Rewards = ProjectModel.hasMany(RewardModel);
              RewardModel.Project = RewardModel.belongsTo(ProjectModel);

              /* Ensure the tables exist in the database before continuing */
              await ProjectModel.sync();
              await RewardModel.sync();

              /* Everything is connected - resolve */
              resolve(connection);
            });
          });
      })
      .catch(async (err) => {
        reject(err);
      });
  });
};

module.exports.createSequelizeConnection = createSequelizeConnection;
