/* eslint-disable import/no-extraneous-dependencies,global-require,no-await-in-loop,no-plusplus,no-console */
const path = require('path');
const { config } = require('dotenv');

const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const ProgressBar = require('progress');
const _ = require('lodash');
const PromiseBar = require('promise.bar');
const chalk = require('chalk');

PromiseBar.enable();

/**
 * Generate Projects Into Database
 */
const generateProjects = async (dbName, seedAmount) => {
  config({ path: path.resolve(__dirname, '../../config/.env') });

  /* Set The Datbase Name */
  process.env.DATABASE_NAME = dbName;

  /* Require the datbase */
  const database = require('../../database');

  /* Require the generators for mock projects and rewards */
  const { generateMockProject, generateMockReward } = require('./generator');

  /* Connect to the database, drop all tables, then generate the projects in the database */
  const connection = await database.createSequelizeConnection();
  await connection.drop();

  /* Create a progress bar to notify the user of staging percentage */
  const stagingBar = new ProgressBar(
    chalkPipe('green.bold')(
      'Staged [:bar] :current of :total entries - :percent :etas'
    ),
    {
      complete: '=',
      incomplete: ' ',
      width: 30,
      total: seedAmount
    }
  );

  try {
    /* Get the project and rward models */
    const Project = database.getProjectModel();
    const Reward = database.getRewardModel();

    /* Sync the tables to ensure they exist */
    await Project.sync({ force: true });
    await Reward.sync({ force: true });

    /* Max and min number of rewards to generate*/
    const maxRewards = 8;
    const minRewards = 3;

    /* Create arrays to hold generated data */
    const projects = [];
    const rewards = [];

    /* Loop from 1 to the seed amount and populate generator arrays */
    for (let i = 1; i <= seedAmount; i++) {
      const newProject = generateMockProject();
      projects.push(newProject);

      const randomNumber =
        Math.floor(Math.random() * (maxRewards - minRewards + 1)) + minRewards;

      for (let j = 1; j <= randomNumber; j++) {
        const newReward = generateMockReward();
        newReward.projectId = i;
        rewards.push(newReward);
      }

      /* Update the progress bar */
      stagingBar.tick();
    }

    /* Split the generator arrays into chunks - this avoid packet_size errors for large seed operations */
    const projectChunks = _.chunk(projects, seedAmount / (seedAmount * 0.01));
    const rewardChunks = _.chunk(rewards, rewards.length / (seedAmount * 0.01));

    /* Create a progress bar to notify the user of bulk creation progress */
    const creationBar = new ProgressBar(
      chalkPipe('green.bold')(
        'Seeding [:bar] :current of :total chunks - :percent :etas'
      ),
      {
        complete: '=',
        incomplete: ' ',
        width: 30,
        total: projectChunks.length + rewardChunks.length
      }
    );

    /* Array to hold bulk creations */
    const creations = [];

    /* Loop through the project chunks and bulk create each chunk */
    projectChunks.forEach((chunk) => {
      creations.push(Project.bulkCreate(chunk));
      creationBar.tick();
    });

    /* Loop through the reward chunks and bulk create each chunk */
    rewardChunks.forEach((chunk) => {
      creations.push(Reward.bulkCreate(chunk));
      creationBar.tick();
    });

    /* This is the same funciton as Promise.all - using the Promise.bar npm package to display the progress to the screen*/
    PromiseBar.all(creations, {
      label: chalk.blue('Verify'),
      barFormat: chalk.dim.blue
    }).then(() => {
      /* All done! Notify user and exit! */
      console.log(chalkPipe('green.bold')('Database Seeded Successfully!'));
      process.exit(0);
    });
  } catch (e) {
    /* Error! Notify user and exit! */
    console.error(chalkPipe('red.bold')(e));
    process.exit(0);
  }
};

/**
 * IIFE to run the console questionnaire upon module load
 */
(() => {
  /* Mutable variables to hold the database name and seeding amount */
  let dbName = 'kstart';
  let seedAmount = 100;

  if (process.argv[2] === '--docker') {
    return generateProjects(dbName, seedAmount);
  }

  /* Questions to present to the user in the console */
  const questions = [
    {
      type: 'input',
      name: 'database',
      message: 'Enter the name of the database to seed',
      default: dbName
    },
    {
      type: 'number',
      name: 'entries',
      message: 'Enter the number of parent entries to create',
      default: seedAmount
    }
  ];

  /* Use the inquirer package to promt the user with questions and save the answers */
  inquirer.prompt(questions).then((answers) => {
    seedAmount = answers.entries;
    dbName = answers.database;
    return inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: chalkPipe('orange.bold')(
            `Seed database: '${answers.database}' with ${answers.entries} entries?`
          )
        }
      ])
      .then((finalAnswer) => {
        if (finalAnswer.confirm) {
          return generateProjects(dbName, seedAmount);
        }
      });
  });
})();
