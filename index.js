const Database = require("./src/fetchers/db");

const { getTrips, getTripsByCountry } = require("./src/fetchers/trips");
const { getFlights } = require("./src/fetchers/flights");

const App = require("./src/components/app/index");
const GoogleMaps = require("./src/components/maps/index");
const CitiesLayout = require("./src/components/maps/layouts/cities");
const FlightsLayout = require("./src/components/maps/layouts/flights");

module.exports = {
  Database,
  getTrips,
  getTripsByCountry,
  getFlights,
  App,
  GoogleMaps,
  CitiesLayout,
  FlightsLayout,
};
