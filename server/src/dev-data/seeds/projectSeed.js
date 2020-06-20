/* eslint-disable no-plusplus,no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const { config } = require('dotenv');

config({ path: path.resolve(__dirname, '../../config/.env') });

/* APPEND _test to the end of the database name to avoid destroying our production database */
/* Comment out this line to seed the production database */
process.env.DATABASE_NAME += '_test';

const database = require('../../database');

const seedAmount = 100;

const { generateMockProject, generateMockReward } = require('./generator');

/**
 * Generate Projects Into Database
 */
const generateProjects = async () => {
  /* Create an array to hold promises for use with promise.all */
  console.log('Seeding...');
  try {
    const Project = database.getProjectModel();
    const Reward = database.getRewardModel();

    await Project.sync({ force: true });
    await Reward.sync({ force: true });

    const maxRewards = 8;
    const minRewards = 3;

    /* Loop from 1 to the seed amount and populate the database */
    for (let i = 1; i <= seedAmount; i++) {
      const newProject = generateMockProject();
      await Project.create(newProject);

      const randomNumber =
        Math.floor(Math.random() * (maxRewards - minRewards + 1)) + minRewards;

      for (let j = 1; j <= randomNumber; j++) {
        const newReward = generateMockReward();
        newReward.projectId = i;
        await Reward.create(newReward);
      }
    }
    console.log('Projects Table seeded successfuly!');
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
};

/* Connect to the database, drop all tables, then generate the projects in the database */
database
  .createSequelizeConnection()
  .then((connection) => {
    return connection.drop();
  })
  .then(() => {
    generateProjects();
  })
  .catch((err) => {
    console.log(err);
  });
