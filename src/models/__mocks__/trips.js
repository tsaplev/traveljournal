const trips = jest.requireActual("../trips");
const fixtures = require("../__fixtures__/trips");
const Database = require("../db");

const db = new Database();

const getTrips = () => {
  db.getAllRows = jest.fn().mockResolvedValue(fixtures.trips);
  return trips.getTrips(db);
};

const getTripsByCountry = () => {
  db.getAllRows = jest.fn().mockResolvedValue(fixtures.countries);
  return trips.getTripsByCountry(db);
};

const getVisitedCities = () => {
  db.getAllRows = jest.fn().mockResolvedValue(fixtures.cities);
  return trips.getVisitedCities(db);
};

module.exports = {
  ...trips,
  getTrips,
  getTripsByCountry,
  getVisitedCities,
};
