const generateMockProject = require('../../dev-data/seeds/generator');

describe('database seeder', () => {
  const mockProject = generateMockProject();
  it('should correctly mock a project model', () => {
    expect.hasAssertions();
    expect(typeof mockProject.subtitle).toBe('string');
    expect(typeof mockProject.category).toBe('string');
    expect(typeof mockProject.subcategory).toBe('string');
    expect(typeof mockProject.location).toBe('string');
    expect(typeof mockProject.title).toBe('string');
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
  it.todo('should correctly mock a rewards model');
});
