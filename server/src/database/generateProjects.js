const faker = require('faker');
const random = require('random');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const getDaysBetween = (date1, date2) => {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const projectGenerator = () => ({
  title: faker.commerce.productName(),
  creator: faker.internet.userName(),
  subtitle: faker.company.catchPhrase(),
  category: faker.commerce.department(),
  subcategory: faker.commerce.productAdjective(),
  location: faker.fake('{{address.city}}, {{address.stateAbbr}}'),
  heroImage: faker.image.image(),
  heroVideo: 'https://ytroulette.com/',
  launchDate: faker.date.future().toString(),
  campaignDuration: getDaysBetween(new Date(), faker.date.future()),
  budget: Math.floor(faker.finance.amount()),
  fundingGoal: Math.floor(faker.finance.amount())
})

const writeProjects = () => {
  writer.pipe(fs.createWriteStream('projects.csv'));
  for (var i = 0; i < 10000000; i++) {
    writer.write(projectGenerator())
  }

  writer.end();
  console.log('data generated');
}

writeProjects();