const { getAllFlights } = require("./flights");

describe("Fetching flights data", () => {
  test("fetch data from myflightradar", async () => {
    const flightsData = await getAllFlights("tsaplev");

    expect(flightsData).toHaveProperty("points");
    expect(flightsData).toHaveProperty("paths");
    flightsData.paths.forEach((path) => expect(path).toHaveLength(5));
    flightsData.points.forEach((point) => {
      expect(point).toHaveProperty("lat");
      expect(point).toHaveProperty("lon");
    });
  });
});
