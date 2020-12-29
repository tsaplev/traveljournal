const { getTrips, getCitiesAsList, getTripsByCountry } = require("./cities");
const fixtures = require("./__fixtures__/cities");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

const { queryAllRows } = require("./utils");
jest.mock("./utils");

describe("Fetch data from database", () => {
  test("get all visited cities", async () => {
    queryAllRows.mockResolvedValue(fixtures.visits);

    const tripsByYear = await getTrips();

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

  test("get cities as list", async () => {
    queryAllRows.mockResolvedValue(fixtures.visits);
    const visitedCities = await getTrips();

    const cities = await getCitiesAsList(visitedCities);

    expect(cities).toMatchSchema({
      type: "object",
      patternProperties: {
        "^[12][0-9]{3}$": {
          type: "array",
          items: {
            type: "object",
            required: ["country", "city", "date"],
          },
        },
      },
      additionalProperties: false,
    });
  });

  test("get list of cities sorted by country", async () => {
    queryAllRows.mockResolvedValue(fixtures.countries);

    const countries = await getTripsByCountry();

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
