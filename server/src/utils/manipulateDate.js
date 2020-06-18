/**
 * Milliseconds in a day
 * @type {number}
 * @private
 */
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Utility function for getting the difference between two dates
 * @param date1 The first date to start the calculation
 * @param date2 The date to be calculated to
 * @returns {number} The amount of days between the two dates
 */
module.exports.getDaysBetween = (date1, date2) => {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

/**
 * Utility function for adding days to a passed in date
 * @param date The Date Object to use as a base point
 * @param days The amount of days to add to the date
 * @returns {Date} The new date object n days after the original date
 */
module.exports.addDays = (date, days) => {
  if (!days) return date;

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
