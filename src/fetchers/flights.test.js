const { getAllFlights } = require("./flights");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

describe("Fetching flights data", () => {
  test("fetch data from myflightradar", async () => {
    const flightsData = await getAllFlights("tsaplev");
    const flightsSchema = {
      type: "object",
      required: ["points", "paths"],
      additionalProperties: false,
      properties: {
        points: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            required: ["lat", "lon"],
            additionalProperties: true,
          },
        },
        paths: {
          type: "array",
          minItems: 1,
          items: {
            type: "array",
            contains: { type: "string" },
            minItems: 5,
            maxItems: 5,
          },
        },
      },
    };

    expect(flightsData).toMatchSchema(flightsSchema);
  });
});
