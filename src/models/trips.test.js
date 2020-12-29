const { getTrips, getTripsByCountry } = require("./trips");
const fixtures = require("./__fixtures__/trips");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

const db = require("./db");

describe("Fetch data from database", () => {
  test("get all visited cities", async () => {
    db.getAllRows = jest.fn().mockResolvedValue(fixtures.trips);

    const tripsByYear = await getTrips(db);

    expect(tripsByYear).toMatchSchema({
      type: "object",
      patternProperties: {
        "^[12][0-9]{3}$": {
          type: "array",
          items: {
            type: "object",
            required: [
              "id",
              "arrival",
              "departure",
              "city",
              "lat",
              "lon",
              "country",
              "country_code",
              "country_flag",
            ],
          },
        },
      },
      additionalProperties: false,
    });
  });

  test("get list of cities sorted by country", async () => {
    db.getAllRows = jest.fn().mockResolvedValue(fixtures.countries);

    const countries = await getTripsByCountry(db);

    expect(countries).toMatchSchema({
      type: "array",
      items: {
        type: "object",
        required: ["flag", "name", "cities"],
        properties: {
          cities: {
            type: "string",
            not: { pattern: "(,(?=S)|:)" },
          },
        },
      },
    });
  });
});
