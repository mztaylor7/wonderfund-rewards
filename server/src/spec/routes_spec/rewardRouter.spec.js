/* eslint-disable global-require,prefer-destructuring,mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax */
const supertest = require('supertest');
const { assert } = require('chai');

describe('/api/rewards', function () {
  let server;
  let database;
  let connection;
  let request;
  let Project;
  let Reward;
  const apiAddress = '/api/rewards';

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

  const mockReward2 = {
    title: 'Handcrafted Metal Bacon 2',
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
   * Test the Reward GET Routes
   */
  context('GET /', function () {
    it('should get all rewards if a [projectId] is passed in', async function () {
      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
      const resObj = res.body[0];
      delete resObj.id;
      delete resObj.createdAt;
      delete resObj.updatedAt;
      assert.deepEqual(resObj, mockReward);
    });

    it(
      'should get a single reward if both an [projectId] and [rewardId] query parameter is' +
        ' passed' +
        ' in',
      async function () {
        const res = await request.get(`${apiAddress}?projectId=1&rewardId=1`);

        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 1);
      }
    );

    it('should get a single reward if only an [rewardId] query parameter is passed in', async function () {
      const res = await request.get(`${apiAddress}?rewardId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });

    it(
      'should return an empty array if only an [rewardId] query parameter is passed in and no' +
        ' matching' +
        ' reward is found',
      async function () {
        const res = await request.get(`${apiAddress}?rewardId=2`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 0);
      }
    );

    it('should return an empty array if only an empty projectId is passed in', async function () {
      const res = await request.get(`${apiAddress}?projectId=`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 0);
    });

    it(
      'should return an empty array if only a [projectId] query parameter is passed in and no' +
        ' matching reward is found',
      async function () {
        const res = await request.get(`${apiAddress}?projectId=2`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 0);
      }
    );

    it('should return a status code of 400 if no params are passed in', async function () {
      const res = await request.get(apiAddress);
      assert.equal(res.statusCode, 400);
    });

    it('should return a status code of 400 if a database error occurs', async function () {
      await connection.close();
      let res = await request.get(apiAddress);
      assert.equal(res.statusCode, 400);

      res = await request.get(`${apiAddress}?rewardId=1&projectId=1`);
      assert.equal(res.statusCode, 400);
    });
  });

  /**
   * Test the Reward POST Routes
   */
  context('POST /', function () {
    it('should create a new reward in the database with the given request body data', async function () {
      const postRes = await request
        .post(`${apiAddress}?projectId=1`)
        .send(mockReward2)
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 200);
      assert.isDefined(postRes.body);

      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 2);
    });
    it('should return status code 400 if incorrect body data is passed in', async function () {
      const incorrectProject = { ...mockReward2 };
      delete incorrectProject.title;

      const postRes = await request
        .post(`${apiAddress}?projectId=1\``)
        .send(incorrectProject)
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 400);

      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return status code 400 if no body data is passed in', async function () {
      const postRes = await request
        .post(`${apiAddress}?projectId=1\``)
        .send({})
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 400);

      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return a status code of 400 if a database error occurs', async function () {
      await connection.close();
      const res = await request.post(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 400);
    });
  });

  /**
   * Test the Reward PUT / PATCH Routes
   */
  context('PUT & PATCH /', function () {
    it(
      'should return status code 400 if no [projectId] query parameter is passed' +
        ' in',
      async function () {
        const res = await request.get(`${apiAddress}`);
        assert.equal(res.statusCode, 400);
        assert.isUndefined(res.body.length);
      }
    );
    it(
      'should replace / update a single reward if both an [rewardId] and [projectId] query' +
        ' parameter' +
        ' is' +
        ' passed' +
        ' in',
      async function () {
        const putRes = await request
          .put(`${apiAddress}?rewardId=1&projectId=1`)
          .send(mockReward2)
          .set('Accept', 'application/json');

        assert.equal(putRes.statusCode, 200);

        const res = await request.get(`${apiAddress}?rewardId=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body[0].title, mockReward2.title);
      }
    );
    it(
      'should replace / update a single reward if only an [rewardId] query parameter is passed' +
        ' in',
      async function () {
        const putRes = await request
          .put(`${apiAddress}?rewardId=1`)
          .send(mockReward2)
          .set('Accept', 'application/json');

        assert.equal(putRes.statusCode, 200);

        const res = await request.get(`${apiAddress}?rewardId=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body[0].title, mockReward2.title);
      }
    );
    it(
      'should return an empty object if only an [rewardId] query parameter is passed in and no' +
        ' matching' +
        ' reward is found',
      async function () {
        const res = await request
          .put(`${apiAddress}?rewardId=2`)
          .send(mockReward2)
          .set('Accept', 'application/json');
        assert.equal(res.statusCode, 200);
        assert.doesNotHaveAnyKeys(res.body);
      }
    );
    it(
      'should replace / update a single reward if only a [projectId] query parameter is passed' +
        ' in',
      async function () {
        const putRes = await request
          .put(`${apiAddress}?projectId=1`)
          .send(mockReward2)
          .set('Accept', 'application/json');

        assert.equal(putRes.statusCode, 200);

        const res = await request.get(`${apiAddress}?rewardId=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body[0].title, mockReward2.title);
      }
    );
    it(
      'should return an empty object if only a [projectId] query parameter is passed in and no' +
        ' matching reward is found',
      async function () {
        const res = await request
          .put(`${apiAddress}?projectId=2`)
          .send(mockReward2)
          .set('Accept', 'application/json');
        assert.equal(res.statusCode, 200);
        assert.doesNotHaveAnyKeys(res.body);
      }
    );
    it('should return status code 400 if incorrect body data is passed in', async function () {
      const incorrectProject = { ...mockReward2 };
      delete incorrectProject.title;

      const postRes = await request
        .put(`${apiAddress}?rewardId=1&projectId=1`)
        .send(incorrectProject)
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 200);
      assert.doesNotHaveAnyKeys(postRes.body);
      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return status code 400 if no body data is passed in', async function () {
      const postRes = await request
        .put(`${apiAddress}?rewardId=1&projectId=1`)
        .send({})
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 200);
      assert.doesNotHaveAnyKeys(postRes.body);
      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
  });

  /**
   * Test the Project DELETE Routes
   */
  context('DELETE /', function () {
    it(
      'should return status code 400 if no [projectId] query parameter is passed' +
        ' in',
      async function () {
        const res = await request.get(`${apiAddress}`);
        assert.equal(res.statusCode, 400);
        assert.isUndefined(res.body.length);
      }
    );
    it(
      'should delete a single reward if both an [rewardId] and [projectId] query parameter is' +
        ' passed' +
        ' in',
      async function () {
        const delRes = await request.delete(
          `${apiAddress}?rewardId=1&projectId=1`
        );
        assert.equal(delRes.statusCode, 200);
        const res = await request.get(`${apiAddress}?projectId=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 0);
      }
    );
    it('should delete a single reward if only an [rewardId] query parameter is passed in', async function () {
      const delRes = await request.delete(`${apiAddress}?rewardId=1`);
      assert.equal(delRes.statusCode, 200);
      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 0);
    });
    it(
      'should not delete any rewards if only an [rewardId] query parameter is passed in and no' +
        ' matching reward is found',
      async function () {
        const delRes = await request.delete(`${apiAddress}?rewardId=2`);
        assert.equal(delRes.statusCode, 200);
        const res = await request.get(`${apiAddress}?projectId=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 1);
      }
    );
    it('should delete a single reward if only a [projectId] query parameter is passed in', async function () {
      const delRes = await request.delete(`${apiAddress}?projectId=1`);
      assert.equal(delRes.statusCode, 200);
      const res = await request.get(`${apiAddress}?projectId=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 0);
    });
    it(
      'should not delete any rewards if only a [projectId] query parameter is passed in and no' +
        ' matching' +
        ' reward is found',
      async function () {
        const delRes = await request.delete(`${apiAddress}?projectId=2`);
        assert.equal(delRes.statusCode, 200);
        const res = await request.get(`${apiAddress}?projectId=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 1);
      }
    );
    it('should return a status code of 400 if a database error occurs', async function () {
      await connection.close();
      const res = await request.delete(`${apiAddress}?rewardId=1&projectId=1`);
      assert.equal(res.statusCode, 400);
    });
  });
});
