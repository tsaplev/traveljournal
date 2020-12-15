const cities = jest.requireActual("../cities");
const { visits, countries } = require("../__fixtures__/cities");
const { queryAllRows } = require("../utils");

jest.mock("../utils");

const getAllVisitedCities = () => {
  queryAllRows.mockResolvedValue(visits);
  return cities.getAllVisitedCities();
};

const getListOfCitiesSortedByCountry = () => {
  queryAllRows.mockResolvedValue(countries);
  return cities.getListOfCitiesSortedByCountry();
};

module.exports = {
  ...cities,
  getAllVisitedCities,
  getListOfCitiesSortedByCountry,
};
