const flights = jest.requireActual("../flights");
const fixtures = require("../__fixtures__/flights");

const getAllFlights = jest.fn().mockReturnValue(fixtures.flights);

module.exports = {
  ...flights,
  getAllFlights,
};
