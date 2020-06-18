// Fix for JEST incompatibility with Sequelize encoding
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { assert } = require('chai');

const {
  generateMockProject,
  generateMockReward
} = require('../../dev-data/seeds/generator');

const mockProject = generateMockProject();
const mockReward = generateMockReward();

/**
 * Faker Generator Unit Tests
 */
describe('mock generator', function() {
  /**
   * Project Model Unit Tests
   */
  describe('mock project', function() {
    it('should correctly mock a project model', function() {
      assert.isString(mockProject.title);

      assert.isString(mockProject.title);
      assert.isString(mockProject.subtitle);
      assert.isString(mockProject.category);
      assert.isString(mockProject.subcategory);
      assert.isString(mockProject.location);
      assert.isString(mockProject.heroImage);
      assert.isString(mockProject.heroVideo);
      assert.instanceOf(mockProject.launchDate, Date);
      assert.isNumber(mockProject.campaignDuration);
      assert.isNumber(mockProject.budget);
      assert.isNumber(mockProject.fundingGoal);
      assert.isArray(mockProject.rewards);
    });

    it('should only contain numbers in the rewards array', function() {
      // eslint-disable-next-line no-restricted-globals
      const result = mockProject.rewards.some(isNaN);
      assert.isFalse(result);
    });
  });

  /**
   * Rewards Model Unit Test
   */
  describe('mock reward', function() {
    it('should correctly mock a rewards model', function() {
      assert.isString(mockReward.title);
      assert.isNumber(mockReward.pledgeAmount);
      assert.isString(mockReward.description);
      assert.isString(mockReward.deliveryMonth);
      assert.isNumber(mockReward.deliveryYear);
      assert.isString(mockReward.shippingType);
      assert.isNumber(mockReward.rewardQuantity);
      assert.isNumber(mockReward.timeLimit);
      assert.isNumber(mockReward.projectId);
      assert.isArray(mockReward.rewardItems);
    });

    it('should only contain strings in the rewards items array', function() {
      assert.isTrue(
        mockReward.rewardItems.every((item) => typeof item === 'string')
      );
    });
  });
});
