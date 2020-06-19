/* eslint-disable mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax,global-require,import/no-extraneous-dependencies,node/no-extraneous-require */
const { assert } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const decache = require('decache');

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('server', function () {
  const env = { ...process.env };
  const testPort = 3010;
  let server;
  let database;

  beforeEach(async function () {
    process.env.PORT = testPort;
    server = require('../../index');
    database = require('../../database');
  });

  afterEach(async function () {
    await server.close();
  });

  after(async function () {
    process.env = env;
  });

  context('port', function () {
    it('should be running on the specified port in process.env', function () {
      const result = process.env.PORT;
      assert.equal(result, testPort);
    });

    it('should be running in the NODE_ENV "test" while in test mode', function () {
      const result = process.env.NODE_ENV;
      assert.equal(result, 'test');
    });

    it('should be using the database kstart_test', function () {
      const result = process.env.DATABASE_NAME;
      assert.equal(result, 'kstart_test');
    });
  });

  context('database success', function () {
    it('should successfully connect to the database if the correct credentials are passed in', function () {
      assert.isFulfilled(database.createSequelizeConnection());
    });

    it('should fail to connect to the database if incorrect credentials are passed in', function () {
      process.env.DATABASE_USER = '';
      assert.isRejected(database.createSequelizeConnection());
    });

    it('should connect automatically to the database if not running in test mode', async function () {
      await server.close();
      process.env.DATABASE_USER = 'root';
      process.env.NODE_ENV = 'development';

      decache('../../index.js');
      decache('../../database');

      database = require('../../database');

      const cb = sinon.spy();
      const cx = database.createSequelizeConnection;

      database.createSequelizeConnection = cb;

      server = require('../../index');

      sinon.assert.called(cb);

      database.createSequelizeConnection = cx;

      process.env.NODE_ENV = 'test';
      decache('../../index.js');
    });
  });
});
