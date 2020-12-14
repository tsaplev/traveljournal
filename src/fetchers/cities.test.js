const {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
} = require("./cities");
const { visits, countries } = require("./__fixtures__/cities");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

const { queryAllRows } = require("./utils");
jest.mock("./utils", () => ({
  ...jest.requireActual("./utils.js"),
  queryAllRows: jest.fn(),
}));

describe("Fetch data from database", () => {
  test("get all visited cities", async () => {
    queryAllRows.mockResolvedValue(visits);

    const tripsByYear = await getAllVisitedCities();

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
    queryAllRows.mockResolvedValue(visits);
    const visitedCities = await getAllVisitedCities();

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
    queryAllRows.mockResolvedValue(countries);

    const _countries = await getListOfCitiesSortedByCountry();
    expect(_countries).toMatchSchema({
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
