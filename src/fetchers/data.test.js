const { getHtmlData } = require("./data");

jest.mock("./cities");
jest.mock("../config", () => ({
  ...jest.requireActual("../config"),
  commonInfo: {
    siteTitle: "website title",
    title: "full name",
    subTitle: "text under the name",
    googleMapApiKey: "sUpErSeCrEtKeY",
    flightradarUsername: "tsaplev",
  },
}));

describe("Fetch data from all sources", () => {
  test("collect data for the main template", async () => {
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
    expect(data.countries).toMatchSnapshot();
    expect(data.visits).toMatchSnapshot();
    expect(data.shareData).toEqual(
      expect.stringMatching(/<script>window\.shareData = {(.*)};<\/script>/)
    );
  });
});
