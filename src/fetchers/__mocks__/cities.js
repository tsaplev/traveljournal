const cities = jest.requireActual("../cities");
const fixtures = require("../__fixtures__/cities");
const { queryAllRows } = require("../utils");

jest.mock("../utils");

const getAllVisitedCities = () => {
  queryAllRows.mockResolvedValue(fixtures.visits);
  return cities.getAllVisitedCities();
};

const getListOfCitiesSortedByCountry = () => {
  queryAllRows.mockResolvedValue(fixtures.countries);
  return cities.getListOfCitiesSortedByCountry();
};

module.exports = {
  ...cities,
  getAllVisitedCities,
  getListOfCitiesSortedByCountry,
};
