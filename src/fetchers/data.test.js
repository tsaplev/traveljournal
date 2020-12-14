const { getHtmlData } = require("./data");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

jest.mock("./cities");
jest.mock("../config", () => {
  const config = jest.requireActual("../config");
  return {
    ...config,
    commonInfo: {
      ...config.commonInfo,
      flightradarUsername: "tsaplev",
    },
  };
});

describe("Fetch data from all sources", () => {
  test("collect data for the main template", async () => {
    const data = await getHtmlData();

    expect(data).toMatchSchema({
      type: "object",
      required: [
        "siteTitle",
        "title",
        "subTitle",
        "googleMapApiKey",
        "flightradarUsername",
        "shareData",
        "countries",
        "visits",
      ],
    });
    expect(data.countries).toMatchSnapshot();
    expect(data.visits).toMatchSnapshot();
    expect(data.shareData).toEqual(
      expect.stringMatching(/<script>window\.shareData = {(.*)};<\/script>/)
    );
  });
});
