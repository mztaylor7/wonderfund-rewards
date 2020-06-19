/* eslint-disable mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax,global-require,import/no-extraneous-dependencies,node/no-extraneous-require */
const Sequelize = require('sequelize');
const { assert } = require('chai');
const chai = require('chai');
chai.use(require('chai-as-promised'));

describe('server', function () {
  const env = { ...process.env };
  const testPort = 3010;
  let connection;

  const connectToDb = () => {
    const {
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_HOST
    } = process.env;

    connection = new Sequelize(
      DATABASE_NAME,
      DATABASE_USER,
      DATABASE_PASSWORD,
      {
        host: DATABASE_HOST,
        dialect: 'mysql',
        logging: false
      }
    );

    return connection.authenticate();
  };

  before(function () {
    process.env.PORT = testPort;
  });

  after(async function () {
    process.env = env;
  });

  context('port', function () {
    it('should be running on the specified port in process.env', function () {
      const result = process.env.PORT;
      assert.equal(result, testPort);
    });
  });

  context('database', function () {
    it('should successfully connect to the database if the correct credentials are passed in', async function () {
      await assert.isFulfilled(connectToDb());
      connection.close();
    });

    it('should throw an error if the database credentials are incorrect', async function () {
      process.env.DATABASE_USER = '';
      process.env.DATABASE_PASSWORD = '';
      await assert.isRejected(connectToDb(), Error);
      connection.close();
    });
  });
});
