const {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
} = require("./cities");
const { visits, countries } = require("./__fixtures__/cities");

const { queryAllRows } = require("./utils");
jest.mock("./utils");

describe("Cities", () => {
  test("getAllVisitedCities", async () => {
    queryAllRows.mockResolvedValue(visits);

    const visitedCities = await getAllVisitedCities();
    expect(Object.keys(visitedCities)).toEqual(["1995", "2007", "2014"]);
    expect(visitedCities["1995"]).toHaveLength(1);
    expect(visitedCities["2014"]).toHaveLength(2);
  });

  test("getCitiesAsList", async () => {
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

  test("getListOfCitiesSortedByCountry", async () => {
    queryAllRows.mockResolvedValue(countries);

    const _countries = await getListOfCitiesSortedByCountry();
    Object.values(_countries).forEach((country) => {
      expect(Object.keys(country)).toEqual(["flag", "name", "cities"]);
      // TODO expect country.cities not toContaint string with non space after comma
    });
  });
});
