// eslint-disable-next-line import/no-extraneous-dependencies,node/no-extraneous-require
const Sequelize = require('sequelize');

/* Import Debug module
 *  These modules are used in place of 'console.log' to keep the terminal from being
 *  filled with unnecessary items during production runs
 * */
const dbDebug = require('debug')('database:startup');

/* Destructure out the environmental variables from process.env*/
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = process.env;

// Connect to MySQL Database
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Init Database Connection
sequelize
  .authenticate()
  .then(() => {
    dbDebug('Connection has been established successfully.');
  })
  .catch((err) => {
    dbDebug('Unable to connect to the database:', err);
  });

// Export the main Sequelize App & the db connection
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
