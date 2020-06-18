const { getDaysBetween, addDays } = require('../../utils/manipulateDate');

/**
 * Date Manipulation Unit Tests
 */
describe('date manipulation', () => {
  let today;
  let tomorrow;
  let difference;

  describe('add days', () => {
    it('should correctly add 1 day to the current date', () => {
      expect.assertions(1);
      today = new Date('1/1/2020');
      const tomorrowDateCheck = new Date('1/2/2020');
      tomorrow = addDays(today, 1);
      expect(tomorrow.getDate()).toBe(tomorrowDateCheck.getDate());
    });

    it('should return the current date if no days are passed in', () => {
      expect.assertions(1);
      today = new Date('1/1/2020');
      tomorrow = addDays(today);
      expect(today.getDate()).toBe(tomorrow.getDate());
    });
  });

  describe('get days between', () => {
    it('should return the correct amount of days between two dates', () => {
      expect.assertions(1);
      today = new Date();
      tomorrow = addDays(today, 1);
      difference = getDaysBetween(today, tomorrow);
      expect(difference).toBe(1);
    });

    it('should return the correct amount of days between two dates if the second argument is in the past', () => {
      expect.assertions(1);
      today = new Date();
      tomorrow = addDays(today, -1);
      difference = getDaysBetween(today, tomorrow);
      expect(difference).toBe(-1);
    });
  });
});
