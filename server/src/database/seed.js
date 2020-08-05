require('dotenv').config();
const path = require('path');
const { Pool, Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
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
    console.log(`Postgres running on port ${process.env.PGPORT}`);
    client.end();
  }
);


/*
Insert examples
*/

// insert into rewards(title, pledgeAmount, description, deliveryMonth, deliveryYear, rewardQuantity, projectId, rewardItems) values('Intelligent Rubber Bike', 24, 'Laboriosam sunt aut voluptas doloribus exercitationem. Aut ut libero consequatur repellendus atque blanditiis corporis v', 'July', 2020, 166, 10000000, 'Bacon,Mouse,Chips')

/*
 4488 | Intelligent Rubber Bike |           24 | Laboriosam sunt aut voluptas doloribus exercitationem. Aut ut libero consequatur repellendus atque blanditiis corporis v | July          |         2020 |            166 |       999 | Bacon,Mouse,Chips
 4487 | Ergonomic Plastic Fish  |          867 | Et sed dolorem. Sapiente minima voluptatem. Tempora facilis laudantium vitae id quo dolor quas hic.                      | November      |         2021 |            321 |       999 | Pizza
 4486 | Fantastic Wooden Towels |          753 | Iure nihil at sint. Animi qui voluptatem. Sequi ut veritatis dolorem. Eos quos quia natus distinctio adipisci voluptatem | October       |         2021 |            488 |       999 | Salad
 4485 | Small Granite Ball      |          894 | Consectetur ad ea enim temporibus quas ut velit. In blanditiis qui non est aspernatur ea natus aut quia. Odit odit quia  | March         |         2020 |            388 |       999 | Bacon,Shirt
 4484 | Tasty Steel Car         |          290 | Aut optio reiciendis voluptatem iste. Quis nesciunt repudiandae nulla aut in minima. Placeat tempora quod nihil possimus | July          |         2021 |            351 |       999 | Pants,Salad,Pants,Salad,Fish

*/