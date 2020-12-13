const {
  getHtmlForCountries,
  getHtmlForVists,
  getHtmlData,
} = require("./index");
const { getAllVisitedCities } = require("./cities");

jest.mock("./cities");

describe("Generating html snippets with data", () => {
  test("generating html snippet with list of countries", async () => {
    expect(await getHtmlForCountries()).toMatchSnapshot();
  });
  test("generating html snippet with list of trips sorted by year", async () => {
    const visits = await getAllVisitedCities();

    expect(await getHtmlForVists(visits)).toMatchSnapshot();
  });
  test("collecting all data for the main template", async () => {
    const data = await getHtmlData();

    expect(Object.keys(data)).toEqual([
      "siteTitle",
      "title",
      "subTitle",
      "googleMapApiKey",
      "flightradarUsername",
      "shareData",
      "countries",
      "visits",
    ]);
    expect(data.shareData).toEqual(
      expect.stringMatching(/<script>window\.shareData = {(.*)};<\/script>/)
    );
  });
});
