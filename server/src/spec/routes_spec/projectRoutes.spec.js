/* eslint-disable global-require,prefer-destructuring,mocha/no-setup-in-describe,node/no-unsupported-features/es-syntax */
const supertest = require('supertest');
const { assert } = require('chai');

describe('/api/projects', function () {
  const { server, database } = require('../../index');
  const Project = database.ProjectModel;
  const request = supertest(server);
  const apiAddress = '/api/projects';

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
    rewards: [146]
  };

  //TODO SET UP PRE PROJECT CREATION

  // beforeEach(async function () {
  //   try {
  //     await Project.sync({ force: true });
  //     await Project.create(mockProject);
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // });

  after(async function () {
    await server.close();
    await database.connection.close();
  });

  context('GET /', function () {
    it('should get all projects if no [id] or [name] query parameter is passed in', async function () {
      const res = await request.get(apiAddress);
      assert.equal(res.statusCode, 200);
    });
    it('should get a single project if both an [id] and [name] query parameter is passed in', async function () {
      const res = await request.get(apiAddress);
      assert.equal(res.statusCode, 200);
    });
    it('should get a single project if only an [id] query parameter is passed in', async function () {
      const res = await request.get(apiAddress);
      assert.equal(res.statusCode, 200);
    });
    it('should return status code 400 if only an [id] query parameter is passed in and no matching project is found', async function () {
      const res = await request.get(apiAddress);
      assert.equal(res.statusCode, 200);
    });
    it('should get a single project if only a [name] query parameter is passed in', async function () {});
    it('should return status code 400 if only a [name] query parameter is passed in and no matching project is found', async function () {});
  });

  context('POST /', function () {
    it('should create a new project in the database with the given request body data', async function () {});
    it('should return status code 400 if incorrect body data is passed in', async function () {});
    it('should return status code 400 if no body data is passed in', async function () {});
  });

  context('PUT /', function () {
    it('should return status code 400 no [id] or [name] query parameter is passed in', async function () {});
    it('should replace a single project if both an [id] and [name] query parameter is passed in', async function () {});
    it('should replace a single project if only an [id] query parameter is passed in', async function () {});
    it('should return status code 400 if only an [id] query parameter is passed in and no matching project is found', async function () {});
    it('should replace a single project if only a [name] query parameter is passed in', async function () {});
    it('should return status code 400 if only a [name] query parameter is passed in and no matching project is found', async function () {});
    it('should return status code 400 if incorrect body data is passed in', async function () {});
    it('should return status code 400 if no body data is passed in', async function () {});
  });

  context('PATCH /', function () {
    it('should return status code 400 no [id] or [name] query parameter is passed in', async function () {});
    it('should update a single project if both an [id] and [name] query parameter is passed in', async function () {});
    it('should update a single project if only an [id] query parameter is passed in', async function () {});
    it('should return status code 400 if only an [id] query parameter is passed in and no matching project is found', async function () {});
    it('should update a single project if only a [name] query parameter is passed in', async function () {});
    it('should return status code 400 if only a [name] query parameter is passed in and no matching project is found', async function () {});
    it('should return status code 400 if incorrect body data is passed in', async function () {});
    it('should return status code 400 if no body data is passed in', async function () {});
  });

  context('DELETE /', function () {
    it('should return status code 400 no [id] or [name] query parameter is passed in', async function () {});
    it('should delete a single project if both an [id] and [name] query parameter is passed in', async function () {});
    it('should delete a single project if only an [id] query parameter is passed in', async function () {});
    it('should return status code 400 if only an [id] query parameter is passed in and no matching project is found', async function () {});
    it('should delete a single project if only a [name] query parameter is passed in', async function () {});
    it('should return status code 400 if only a [name] query parameter is passed in and no matching project is found', async function () {});
  });
});
