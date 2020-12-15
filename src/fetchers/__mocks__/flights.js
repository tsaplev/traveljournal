const flights = jest.requireActual("../flights");
const { flightsData } = require("../__fixtures__/flights");

jest.mock("./flights");

const getAllFlights = jest.fn().mockReturnValue(flightsData);

module.exports = {
  ...flights,
  getAllFlights,
};
