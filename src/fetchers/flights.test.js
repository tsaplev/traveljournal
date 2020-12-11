const { getAllFlights } = require("./flights");

describe("Fetching flights data", () => {
  // Since we use external service we have to make sure API hasn't chaged.
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
