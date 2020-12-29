const cities = jest.requireActual("../cities");
const fixtures = require("../__fixtures__/cities");

const db = require("../db");

const getTrips = () => {
  db.getAllRows = jest.fn().mockResolvedValue(fixtures.visits);
  return cities.getTrips(db);
};

const getTripsByCountry = () => {
  db.getAllRows = jest.fn().mockResolvedValue(fixtures.countries);
  return cities.getTripsByCountry(db);
};

module.exports = {
  ...cities,
  getTrips,
  getTripsByCountry,
};
