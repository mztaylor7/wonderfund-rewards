const { expect } = require('chai');
const { getDaysBetween, addDays } = require('../../utils/manipulateDate');

/**
 * Date Manipulation Unit Tests
 */
describe('date manipulation', function () {
  let today;
  let tomorrow;
  let difference;

  context('add days', function () {
    it('should correctly add 1 day to the current date', function () {
      today = new Date('1/1/2020');
      const tomorrowDateCheck = new Date('1/2/2020');
      tomorrow = addDays(today, 1);
      expect(tomorrow.getDate()).to.be.equal(tomorrowDateCheck.getDate());
    });

    it('should return the current date if no days are passed in', function () {
      today = new Date('1/1/2020');
      tomorrow = addDays(today);
      expect(today.getDate()).to.be.equal(tomorrow.getDate());
    });
  });

  context('get days between', function () {
    it('should return the correct amount of days between two dates', function () {
      today = new Date();
      tomorrow = addDays(today, 1);
      difference = getDaysBetween(today, tomorrow);
      expect(difference).to.be.equal(1);
    });

    it('should return the correct amount of days between two dates if the second argument is in the past', function () {
      today = new Date();
      tomorrow = addDays(today, -1);
      difference = getDaysBetween(today, tomorrow);
      expect(difference).to.be.equal(-1);
    });
  });
});
