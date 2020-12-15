const flights = jest.requireActual("../flights");
const { flightsData } = require("../__fixtures__/flights");

const getAllFlights = jest.fn().mockReturnValue(flightsData);

module.exports = {
  ...flights,
  getAllFlights,
};
