const faker = require('faker');
const random = require('random');
const { getDaysBetween } = require('../../utils/manipulateDate');

/**
 * Generate Mock Project
 * Creates a fake project object to be used in seeding the database
 * @returns {{heroVideo: string, subtitle: *, campaignDuration: number, location: *, heroImage: *, launchDate: *,
 *   title: *, category: (*), subcategory: *, fundingGoal: number, rewards: number[], budget: number}}
 */
module.exports.generateMockProject = () => ({
  title: faker.commerce.productName(),
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
});

/**
 * Generate Mock Reward
 * Creates a fake reward object to be used in seeding the database
 * @returns {{timeLimit: number, deliveryYear: number, pledgeAmount: number, shippingType: string, description: string,
 *   rewardQuantity: number, rewardItems: [string, string, string], title: string, projectId: number, deliveryMonth:
 *   number}}
 */
module.exports.generateMockReward = () => ({
  title: faker.commerce.productName(),
  pledgeAmount: Math.floor(faker.finance.amount()),
  description: faker.lorem.paragraph().substring(0, 200),
  deliveryMonth: faker.date.month(),
  deliveryYear: faker.date.future().getFullYear(),
  shippingType: faker.company.bsAdjective(),
  rewardQuantity: faker.random.number(),
  timeLimit: faker.random.number(),
  projectId: faker.random.number(),
  rewardItems: Array.from({ length: random.int(1, 6) }, () =>
    faker.commerce.product()
  ).join(',')
});
