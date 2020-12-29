const Database = require("./src/fetchers/db");

const { getTrips, getTripsByCountry } = require("./src/fetchers/trips");
const { getFlights } = require("./src/fetchers/flights");

module.exports = {
  Database,
  getTrips,
  getTripsByCountry,
  getFlights,
};
