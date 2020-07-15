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
  CREATE TABLE rewards ( id int PRIMARY KEY, title text, pledgeArmount int, description  text, deliveryMonth text, deliveryYear int, shippingType text, rewardQuantity int, timeLimit int, projectId int, rewardItems text);

  COPY rewards(id,title,pledgeArmount,description,deliveryMonth,deliveryYear,shippingType,rewardQuantity,timeLimit,projectId,rewardItems)
  FROM '${rewardsCSV}'
  DELIMITER ',' CSV HEADER;

  DROP TABLE IF EXISTS projects;
  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title text,
    creator text,
    subtitle  text,
    category text,
    subcategory text,
    location text,
    heroImage text,
    heroVideo text,
    launchDate text,
    campaignDuration int,
    budget int,
    fundingGoal int
  );

  COPY projects(title,creator,subtitle,category,subcategory,location,heroImage,heroVideo,launchDate,campaignDuration,budget,fundingGoal)
  FROM '${projectsCSV}'
  DELIMITER ',' CSV HEADER;
  `,
  (err, res) => {
    if (err) {
      throw err;
    }
    console.log(`Postgres running on port ${5434}`);
    client.end();
  }
);