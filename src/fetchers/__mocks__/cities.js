const {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
} = jest.requireActual("../cities");

const { visits, countries } = require("../__fixtures__/cities");

const { queryAllRows } = require("../utils");

jest.mock("../utils", () => ({
  ...jest.requireActual("../utils.js"),
  queryAllRows: jest.fn(),
}));

_getAllVisitedCities = jest.fn(() => {
  queryAllRows.mockResolvedValue(visits);
  return getAllVisitedCities();
});

_getCitiesAsList = getCitiesAsList;

_getListOfCitiesSortedByCountry = jest.fn(() => {
  queryAllRows.mockResolvedValue(countries);
  return getListOfCitiesSortedByCountry();
});

module.exports = {
  getAllVisitedCities: _getAllVisitedCities,
  getCitiesAsList: _getCitiesAsList,
  getListOfCitiesSortedByCountry: _getListOfCitiesSortedByCountry,
};
