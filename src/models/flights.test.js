const { getFlights } = require("./flights");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

describe("Fetching flights data", () => {
  test("fetch data from myflightradar", async () => {
    const flightsData = await getFlights("tsaplev");

    expect(flightsData).toMatchSchema({
      type: "object",
      required: ["points", "paths"],
      additionalProperties: false,
      properties: {
        points: {
          type: "array",
          minItems: 1,
          items: {
            type: "array",
            contains: { type: "string" },
            minItems: 2,
            maxItems: 2,
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
    });
  });
});
