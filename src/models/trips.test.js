const { getTrips, getTripsByCountry, getVisitedCities } = require("./trips");
const fixtures = require("./__fixtures__/trips");
const { matchers } = require("jest-json-schema");
const Database = require("./db");

expect.extend(matchers);

const db = new Database();

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

  test("get coordinates of all visited cities", async () => {
    db.getAllRows = jest.fn().mockResolvedValue(fixtures.cities);

    const cities = await getVisitedCities(db);

    expect(cities).toMatchSchema({
      type: "array",
      items: {
        type: "array",
        contains: { type: "number" },
        minItems: 2,
        maxItems: 2,
      },
    });
  });
});
