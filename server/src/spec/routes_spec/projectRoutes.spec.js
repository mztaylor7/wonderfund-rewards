/* eslint-disable global-require,prefer-destructuring,mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax */
const supertest = require('supertest');
const { assert } = require('chai');

describe('/api/projects', function () {
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

  const mockProject2 = {
    title: 'Fantastic Granite Table 2',
    subtitle: 'Fundamental incremental extranet',
    category: 'Games',
    subcategory: 'Handcrafted',
    location: 'West Prudence, CA',
    heroImage: 'http://lorempixel.com/640/480/nature',
    heroVideo: 'https://ytroulette.com/',
    launchDate: '2021-03-15T21:00:17.200Z',
    campaignDuration: 132,
    budget: 530,
    fundingGoal: 564
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
   * Test the Project GET Routes
   */
  context('GET /', function () {
    it('should get the user image for the passed in project id', async function () {
      const res = await request.get(`${apiAddress}/user?id=1`);
      assert.equal(res.statusCode, 200);
      assert.isDefined(res);
    });

    it('should return a status code of 200 if a user image does not exist', async function () {
      const res = await request.get(`${apiAddress}/user?id=-1`);
      assert.equal(res.statusCode, 400);
    });

    it('should get all projects if no [id] or [name] query parameter is passed in', async function () {
      const res = await request.get(apiAddress);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);

      const resObj = res.body[0];
      delete resObj.id;
      delete resObj.createdAt;
      delete resObj.updatedAt;
      delete resObj.rewards[0].id;
      delete resObj.rewards[0].createdAt;
      delete resObj.rewards[0].updatedAt;
      assert.deepEqual(resObj, mockProject);
    });

    it('should get a single project if both an [id] and [name] query parameter is passed in', async function () {
      const res = await request.get(
        `${apiAddress}/find?id=1&name=Fantastic Granite Table`
      );

      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });

    it('should get a single project if only an [id] query parameter is passed in', async function () {
      const res = await request.get(`${apiAddress}/find?id=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });

    it(
      'should return an empty array if only an [id] query parameter is passed in and no matching' +
        ' project is found',
      async function () {
        const res = await request.get(`${apiAddress}/find?id=2`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 0);
      }
    );

    it('should get a single project if only a [name] query parameter is passed in', async function () {
      const res = await request.get(
        `${apiAddress}/find?name=Fantastic Granite Table`
      );
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });

    it(
      'should return an empty array if only a [name] query parameter is passed in and no' +
        ' matching project is found',
      async function () {
        const res = await request.get(
          `${apiAddress}/find?name=NonExistentProject`
        );
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 0);
      }
    );

    it('should return a status code of 400 if a database error occurs', async function () {
      await connection.close();
      let res = await request.get(apiAddress);
      assert.equal(res.statusCode, 400);

      res = await request.get(
        `${apiAddress}/find?id=1&name=Fantastic Granite Table`
      );
      assert.equal(res.statusCode, 400);
    });
  });

  /**
   * Test the Project POST Routes
   */
  context('POST /', function () {
    it('should create a new project in the database with the given request body data', async function () {
      const postRes = await request
        .post(`${apiAddress}`)
        .send(mockProject2)
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 200);
      assert.isDefined(postRes.body);

      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 2);
    });
    it('should return status code 400 if incorrect body data is passed in', async function () {
      const incorrectProject = { ...mockProject2 };
      delete incorrectProject.title;

      const postRes = await request
        .post(`${apiAddress}`)
        .send(incorrectProject)
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 400);

      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return status code 400 if no body data is passed in', async function () {
      const postRes = await request
        .post(`${apiAddress}`)
        .send({})
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 400);

      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return a status code of 400 if a database error occurs', async function () {
      await connection.close();
      const res = await request.post(apiAddress);
      assert.equal(res.statusCode, 400);
    });
  });

  /**
   * Test the Project PUT / PATCH Routes
   */
  context('PUT & PATCH /', function () {
    it('should return status code 400 if no [id] or [name] query parameter is passed in', async function () {
      const res = await request.get(`${apiAddress}/find`);
      assert.equal(res.statusCode, 400);
      assert.isUndefined(res.body.length);
    });
    it(
      'should replace / update a single project if both an [id] and [name] query parameter is' +
        ' passed' +
        ' in',
      async function () {
        const putRes = await request
          .put(`${apiAddress}/find?id=1&name=Fantastic Granite Table`)
          .send(mockProject2)
          .set('Accept', 'application/json');

        assert.equal(putRes.statusCode, 200);

        const res = await request.get(`${apiAddress}/find?id=1`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body[0].title, mockProject2.title);
      }
    );
    it('should replace / update a single project if only an [id] query parameter is passed in', async function () {
      const putRes = await request
        .put(`${apiAddress}/find?id=1`)
        .send(mockProject2)
        .set('Accept', 'application/json');

      assert.equal(putRes.statusCode, 200);

      const res = await request.get(`${apiAddress}/find?id=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body[0].title, mockProject2.title);
    });
    it(
      'should return an empty object if only an [id] query parameter is passed in and no matching' +
        ' project is found',
      async function () {
        const res = await request
          .put(`${apiAddress}/find?id=2`)
          .send(mockProject2)
          .set('Accept', 'application/json');
        assert.equal(res.statusCode, 200);
        assert.doesNotHaveAnyKeys(res.body);
      }
    );
    it('should replace / update a single project if only a [name] query parameter is passed in', async function () {
      const putRes = await request
        .put(`${apiAddress}/find?name=Fantastic Granite Table`)
        .send(mockProject2)
        .set('Accept', 'application/json');

      assert.equal(putRes.statusCode, 200);

      const res = await request.get(`${apiAddress}/find?id=1`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body[0].title, mockProject2.title);
    });
    it(
      'should return an empty object if only a [name] query parameter is passed in and no' +
        ' matching project is found',
      async function () {
        const res = await request
          .put(`${apiAddress}/find?name=Ugly Marble Table`)
          .send(mockProject2)
          .set('Accept', 'application/json');
        assert.equal(res.statusCode, 200);
        assert.doesNotHaveAnyKeys(res.body);
      }
    );
    it('should return status code 400 if incorrect body data is passed in', async function () {
      const incorrectProject = { ...mockProject2 };
      delete incorrectProject.title;

      const postRes = await request
        .put(`${apiAddress}/find?id=1&name=Fantastic Granite Table`)
        .send(incorrectProject)
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 200);
      assert.doesNotHaveAnyKeys(postRes.body);
      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return status code 400 if no body data is passed in', async function () {
      const postRes = await request
        .put(`${apiAddress}/find?id=1&name=Fantastic Granite Table`)
        .send({})
        .set('Accept', 'application/json');

      assert.equal(postRes.statusCode, 200);
      assert.doesNotHaveAnyKeys(postRes.body);
      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
  });

  /**
   * Test the Project DELETE Routes
   */
  context('DELETE /', function () {
    it('should return status code 400 no [id] or [name] query parameter is passed in', async function () {
      const res = await request.get(`${apiAddress}/find`);
      assert.equal(res.statusCode, 400);
      assert.isUndefined(res.body.length);
    });
    it('should delete a single project if both an [id] and [name] query parameter is passed in', async function () {
      const delRes = await request.delete(
        `${apiAddress}/find?id=1&name=Fantastic Granite Table`
      );
      assert.equal(delRes.statusCode, 200);
      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 0);
    });
    it('should delete a single project if only an [id] query parameter is passed in', async function () {
      const delRes = await request.delete(`${apiAddress}/find?id=1`);
      assert.equal(delRes.statusCode, 200);
      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 0);
    });
    it(
      'should not delete any projects if only an [id] query parameter is passed in and no' +
        ' matching project is found',
      async function () {
        const delRes = await request.delete(`${apiAddress}/find?id=2`);
        assert.equal(delRes.statusCode, 200);
        const res = await request.get(`${apiAddress}`);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 1);
      }
    );
    it('should delete a single project if only a [name] query parameter is passed in', async function () {
      const delRes = await request.delete(
        `${apiAddress}/find?name=Fantastic Granite Table`
      );
      assert.equal(delRes.statusCode, 200);
      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 0);
    });
    it('should not delete any projects if only a [name] query parameter is passed in and no matching project is found', async function () {
      const delRes = await request.delete(
        `${apiAddress}/find?name=Ugly Marble Table`
      );
      assert.equal(delRes.statusCode, 200);
      const res = await request.get(`${apiAddress}`);
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.length, 1);
    });
    it('should return a status code of 400 if a database error occurs', async function () {
      await connection.close();
      const res = await request.delete(
        `${apiAddress}/find?id=1&name=Fantastic Granite Table`
      );
      assert.equal(res.statusCode, 400);
    });
  });
});
