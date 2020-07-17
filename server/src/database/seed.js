require('dotenv').config();
const path = require('path');
const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'kickstarter',
  password: 'taylor',
  port: 5432
});

client.connect();
client.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

var rewardsCSV = path.resolve(__dirname, '../../../../csvs/rewards.csv');
var projectsCSV = path.resolve(__dirname, '../../../../csvs/projects.csv');

client.query(
  `DROP TABLE IF EXISTS rewards;
  CREATE TABLE rewards ( id SERIAL PRIMARY KEY, title text, pledgeAmount int, description  text, deliveryMonth text, deliveryYear int, rewardQuantity int, projectId int, rewardItems text);

  COPY rewards(title,pledgeAmount,description,deliveryMonth,deliveryYear,rewardQuantity,projectId,rewardItems)
  FROM '${rewardsCSV}'
  DELIMITER ',' CSV HEADER;

  DROP TABLE IF EXISTS projects;
  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title text,
    creator text,
    location text
  );

  COPY projects(title,creator,location)
  FROM '${projectsCSV}'
  DELIMITER ',' CSV HEADER;
  `,
  (err, res) => {
    if (err) {
      throw err;
    }
    console.log(`Postgres running on port ${5432}`);
    client.end();
  }
);