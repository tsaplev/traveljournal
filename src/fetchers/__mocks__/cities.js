const cities = jest.requireActual("../cities");
const fixtures = require("../__fixtures__/cities");
const utils = require("../utils");

jest.mock("../utils");

const getTrips = () => {
  utils.queryAllRows.mockResolvedValue(fixtures.visits);
  return cities.getTrips();
};

const getTripsByCountry = () => {
  utils.queryAllRows.mockResolvedValue(fixtures.countries);
  return cities.getTripsByCountry();
};

module.exports = {
  ...cities,
  getTrips,
  getTripsByCountry,
};
