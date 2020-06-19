/* eslint-disable mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax,global-require,import/no-extraneous-dependencies,node/no-extraneous-require */
const { assert } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('server', function () {
  let env;
  const testPort = 3010;
  const { server, database } = require('../../index');

  before(function () {
    env = { ...process.env };
    process.env.PORT = testPort;
  });

  after(async function () {
    if (server) {
      await server.close();
      await database.connection.close();
    }
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
      assert.isTrue(database.connected);
    });
  });
});
