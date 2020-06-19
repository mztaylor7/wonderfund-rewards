// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const server = require('../../index');
const database = require('../../database');

const seedAmount = 100;
const request = supertest(server);
const projectsApiAddress = '/api/projects';
const { generateMockProject } = require('./generator');

/**
 * Generate Projects Into Database
 */
const generateProjects = () => {
  /* Create an array to hold promises for use with promise.all */
  const postPromises = [];

  /* Loop from 1 to the seed amount and populate the database */
  for (let i = 1; i <= seedAmount; i++) {
    const newProject = generateMockProject();
    console.log(`Seeding project ${i} of ${seedAmount}`);
    const postRequest = request
      .post(projectsApiAddress)
      .send(newProject)
      .set('Accept', 'application/json');

    postPromises.push(postRequest);
  }

  /* Wait for all post requests to complete then notify the user - next exit the node process */
  Promise.all(postPromises)
    .then(() => {
      console.log('Projects Table seeded successfuly!');
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
    });
};

/* Connect to the database, drop all tables, then generate the projects in the database */
database
  .createSequelizeConnection()
  .then((connection) => {
    return connection.drop();
  })
  .then(() => {
    generateProjects();
  });
