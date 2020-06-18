const faker = require('faker');
const { getDaysBetween } = require('../../utils/manipulateDate');

/**
 * Generate Mock Project
 * Creates a fake project object to be used in seeding the database
 * @returns {{heroVideo: string, subtitle: *, campaignDuration: number, location: *, heroImage: *, launchDate: *,
 *   title: *, category: (*), subcategory: *, fundingGoal: number, rewards: number[], budget: number}}
 */
const generateMockProject = () => ({
  title: faker.commerce.productName(),
  subtitle: faker.company.catchPhrase(),
  category: faker.commerce.department(),
  subcategory: faker.commerce.productAdjective(),
  location: faker.fake('{{address.city}}, {{address.stateAbbr}}'),
  heroImage: faker.image.image(),
  // TODO randomly generate video
  heroVideo:
    'https://coverr.co/videos/fast-typing-on-white-keyboard-QN73snCaeo',
  launchDate: faker.date.future(),
  campaignDuration: getDaysBetween(new Date(), faker.date.future()),
  budget: Math.floor(faker.finance.amount()),
  fundingGoal: Math.floor(faker.finance.amount()),
  // TODO add reward here programatically
  rewards: [1, 2, 3, 4]
});

module.exports = generateMockProject;
