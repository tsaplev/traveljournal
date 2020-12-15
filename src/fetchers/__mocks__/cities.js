const cities = jest.requireActual("../cities");
const fixtures = require("../__fixtures__/cities");
const utils = require("../utils");

jest.mock("../utils");

const getAllVisitedCities = () => {
  utils.queryAllRows.mockResolvedValue(fixtures.visits);
  return cities.getAllVisitedCities();
};

const getListOfCitiesSortedByCountry = () => {
  utils.queryAllRows.mockResolvedValue(fixtures.countries);
  return cities.getListOfCitiesSortedByCountry();
};

module.exports = {
  ...cities,
  getAllVisitedCities,
  getListOfCitiesSortedByCountry,
};
