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
    it('should correctly add 1 day to the current date', function (done) {
      today = new Date('1/1/2020');
      const tomorrowDateCheck = new Date('1/2/2020');
      tomorrow = addDays(today, 1);
      expect(tomorrow.getDate()).to.be.equal(tomorrowDateCheck.getDate());
      done();
    });

    it('should return the current date if no days are passed in', function (done) {
      today = new Date('1/1/2020');
      tomorrow = addDays(today);
      expect(today.getDate()).to.be.equal(tomorrow.getDate());
      done();
    });
  });

  context('get days between', function () {
    it('should return the correct amount of days between two dates', function (done) {
      today = new Date();
      tomorrow = addDays(today, 1);
      difference = getDaysBetween(today, tomorrow);
      expect(difference).to.be.equal(1);
      done();
    });

    it('should return the correct amount of days between two dates if the second argument is in the past', function (done) {
      today = new Date();
      tomorrow = addDays(today, -1);
      difference = getDaysBetween(today, tomorrow);
      expect(difference).to.be.equal(-1);
      done();
    });
  });
});
