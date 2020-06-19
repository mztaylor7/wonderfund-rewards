const supertest = require('supertest');
const { assert } = require('chai');

describe('/api/projects', function () {
  let server;
  let request;
  const apiAddress = '/api/projects';

  beforeEach(function () {
    // eslint-disable-next-line global-require
    server = require('../../index').server;
    request = supertest(server);
  });

  afterEach(async function () {
    await server.close();
  });

  context('GET /', function () {
    it('should get all projects if no [id] or [name] query parameter is passed in', async function () {
      const response = await request.get(apiAddress);
    });
    it('should get a single project if both an [id] and [name] query parameter is passed in', async function () {});
    it('should get a single project if only an [id] query parameter is passed in', async function () {});
    it('should return status code 400 if only an [id] query parameter is passed in and no matching project is found', async function () {});
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
