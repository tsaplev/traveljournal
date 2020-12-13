const { dateToHRString } = require("./utils");

describe("Utils work properly", () => {
  test.each([
    ["2019-01-01", "2019-01-03", "January 1 - 3"],
    ["2019-01-02", "2019-01-02", "January 2"],
    ["2019-01-30", "2019-02-05", "January 30 - February 5"],
    ["2019-12-25", "2020-01-04", "December 25 - January 4"],
    ["2018-06-14", "2020-02-05", "June 14 2018 - February 5 2020"],
  ])(
    "convert date to human readable string",
    (arrival, departure, expected) => {
      expect(dateToHRString(arrival, departure)).toBe(expected);
    }
  );
});
