/* eslint-disable global-require,prefer-destructuring,mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax */
const supertest = require('supertest');
const { assert } = require('chai');

describe('middleware', function () {
  let server;
  let database;
  let connection;
  let request;
  let Project;
  let Reward;
  const apiAddress = '/api/projects';

  const mockReward = {
    title: 'Handcrafted Metal Bacon',
    pledgeAmount: 535,
    description:
      'Dolorem nulla distinctio temporibus fuga quibusdam qui qui cum sint. Consequatur quia corporis optio non inventore ab qui labore. Quam necessitatibus iure qui. Fuga laborum error. Optio minima quibusdam optio eum.',
    deliveryMonth: 'November',
    deliveryYear: 2020,
    shippingType: 'vertical',
    rewardQuantity: 55709,
    timeLimit: 69840,
    projectId: 1,
    rewardItems: 'Bike,Table,Shirt,Hat,Cheese'
  };

  const mockProject = {
    title: 'Fantastic Granite Table',
    subtitle: 'Fundamental incremental extranet',
    category: 'Games',
    subcategory: 'Handcrafted',
    location: 'West Prudence, CA',
    heroImage: 'http://lorempixel.com/640/480/nature',
    heroVideo: 'https://ytroulette.com/',
    launchDate: '2021-03-15T21:00:17.200Z',
    campaignDuration: 132,
    budget: 530,
    fundingGoal: 564,
    rewards: [mockReward]
  };

  /**
   * Before Each Test
   */
  beforeEach(async function () {
    server = require('../../index');
    database = require('../../database');
    request = supertest(server);
    connection = await database.createSequelizeConnection();
    Project = database.getProjectModel();
    Reward = database.getRewardModel();

    /* Drop the table and create a new object in the table*/
    await connection.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true });
    await connection.query(`truncate table rewards`, null, { raw: true });
    await connection.query(`truncate table projects`, null, { raw: true });
    await connection.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true });
    await Project.sync({ force: false });
    await Project.create(mockProject);
    await Reward.sync({ force: true });
    await Reward.create(mockReward);
  });

  /**
   * After Each Test
   */
  afterEach(async function () {
    await connection.close();
    await server.close();
  });

  /**
   * Test the Parameter Pluck Middleware
   */
  context('parameter pluck', function () {
    it('should correctly pluck parameters from the request object', async function () {
      const res = await request.get(
        `${apiAddress}/find?id=1&name=Fantastic Granite Table`
      );

      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });

    it(
      'should return a 400 error if the "api/projects/find" route is accessed but no query' +
        ' params are passed in',
      async function () {
        const res = await request.get(`${apiAddress}/find`);
        assert.equal(res.statusCode, 400);
        assert.isUndefined(res.body.length);
      }
    );
  });
});
