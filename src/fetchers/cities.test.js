const {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
} = require("./cities");
const { visits, countries } = require("./__fixtures__/cities");

const { queryAllRows } = require("./utils");
jest.mock("./utils");

describe("Fetch data from database", () => {
  test("get all visited cities", async () => {
    queryAllRows.mockResolvedValue(visits);

    const tripsByYear = await getAllVisitedCities();
    Object.entries(tripsByYear).forEach((tripByYear) => {
      const [year, trips] = tripByYear;
      expect(year).toHaveLength(4);
      trips.forEach((trip) => {
        expect(Object.keys(trip)).toEqual([
          "id",
          "arrival",
          "departure",
          "city",
          "lat",
          "lon",
          "country",
          "country_code",
          "country_flag",
        ]);
      });
    });
  });

  test("get cities as list", async () => {
    queryAllRows.mockResolvedValue(visits);
    const visitedCities = await getAllVisitedCities();

    const cities = await getCitiesAsList(visitedCities);
    Object.entries(cities).forEach((city) => {
      const [year, trips] = city;
      expect(year).toHaveLength(4);
      trips.forEach((trip) => {
        expect(Object.keys(trip)).toEqual(["country", "city", "date"]);
      });
    });
  });

  test("get list of cities sorted by country", async () => {
    queryAllRows.mockResolvedValue(countries);

    const _countries = await getListOfCitiesSortedByCountry();
    Object.values(_countries).forEach((country) => {
      expect(Object.keys(country)).toEqual(["flag", "name", "cities"]);
      expect(country.cities).toEqual(expect.not.stringMatching(/(,(?=\S)|:)/));
    });
  });
});
