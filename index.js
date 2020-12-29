const Database = require("./src/models/db");

const { getTrips, getTripsByCountry } = require("./src/models/trips");
const { getFlights } = require("./src/models/flights");
const { formatDate } = require("./src/models/utils");

const App = require("./src/components/app/index");
const GoogleMaps = require("./src/components/maps/index");
const CitiesLayout = require("./src/components/maps/layouts/cities");
const FlightsLayout = require("./src/components/maps/layouts/flights");

module.exports = {
  Database,
  getTrips,
  getTripsByCountry,
  getFlights,
  formatDate,
  App,
  GoogleMaps,
  CitiesLayout,
  FlightsLayout,
};
