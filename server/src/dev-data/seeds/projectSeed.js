const faker = require('faker');
// const database = require('../../database');
// {
//   "title": "<title>",
//   "subtitle": "<subtitle>",
//   "category": "<category>",
//   "subcategory": "<subcategory>",
//   "location": "<location>",
//   "heroImage": "<imageURL>",
//   "heroVideo": "<videoURL>",
//   "launchDate": "<mm/dd/yyyy>",
//   "campaignDuration": "<duration>",
//   "budget": 0,
//   "fundingGoal": 0,
//   "rewards": [1, 2, 3, 4]
// }

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const fakeData = {};
fakeData.title = faker.commerce.productName();
fakeData.subtitle = faker.company.catchPhrase();
fakeData.category = faker.commerce.department();
fakeData.subcategory = faker.commerce.productAdjective();
fakeData.location = faker.fake('{{address.city}}, {{address.stateAbbr}}');
fakeData.heroImage = faker.image.image();
fakeData.heroVideo =
  'https://coverr.co/videos/fast-typing-on-white-keyboard-QN73snCaeo';
fakeData.launchDate = faker.date.future();
fakeData.campaignDuration = dateDiffInDays(new Date(), faker.date.future());
fakeData.budget = Math.floor(faker.finance.amount());
fakeData.fundingGoal = Math.floor(faker.finance.amount());

// TODO add reward here programatically
fakeData.rewards = [1, 2, 3, 4];

console.log(fakeData);
