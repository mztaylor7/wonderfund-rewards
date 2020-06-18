const {
  generateMockProject,
  generateMockReward
} = require('../../dev-data/seeds/generator');

/**
 * Faker Generator Unit Tests
 */
describe('mock generator', () => {
  /**
   * Project Model Unit Tests
   */
  describe('mock project', () => {
    const mockProject = generateMockProject();

    it('should correctly mock a project model', () => {
      expect.hasAssertions();
      expect(typeof mockProject.title).toBe('string');
      expect(typeof mockProject.subtitle).toBe('string');
      expect(typeof mockProject.category).toBe('string');
      expect(typeof mockProject.subcategory).toBe('string');
      expect(typeof mockProject.location).toBe('string');
      expect(typeof mockProject.heroImage).toBe('string');
      expect(typeof mockProject.heroVideo).toBe('string');
      expect(typeof mockProject.launchDate).toBe('object');
      expect(typeof mockProject.campaignDuration).toBe('number');
      expect(typeof mockProject.budget).toBe('number');
      expect(typeof mockProject.fundingGoal).toBe('number');
      expect(Array.isArray(mockProject.rewards)).toBe(true);
    });

    it('should only contain numbers in the rewards array', () => {
      expect.assertions(1);
      // eslint-disable-next-line no-restricted-globals
      expect(mockProject.rewards.some(isNaN)).toBe(false);
    });
  });

  /**
   * Rewards Model Unit Test
   */
  describe('mock reward', () => {
    const mockReward = generateMockReward();

    it('should correctly mock a rewards model', () => {
      expect.hasAssertions();
      expect(typeof mockReward.title).toBe('string');
      expect(typeof mockReward.pledgeAmount).toBe('number');
      expect(typeof mockReward.description).toBe('string');
      expect(typeof mockReward.deliveryMonth).toBe('string');
      expect(typeof mockReward.deliveryYear).toBe('number');
      expect(typeof mockReward.shippingType).toBe('string');
      expect(typeof mockReward.rewardQuantity).toBe('number');
      expect(typeof mockReward.timeLimit).toBe('number');
      expect(typeof mockReward.projectId).toBe('number');
      expect(Array.isArray(mockReward.rewardItems)).toBe(true);
    });

    it('should only contain strings in the rewards items array', () => {
      expect.hasAssertions();
      expect(
        mockReward.rewardItems.every((item) => typeof item === 'string')
      ).toBe(true);
    });
  });
});
