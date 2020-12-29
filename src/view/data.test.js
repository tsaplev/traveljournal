const { getHtmlData } = require("./data");
const { matchers } = require("jest-json-schema");

expect.extend(matchers);

jest.mock("../models/trips");
jest.mock("../models/flights");

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
        "trips",
      ],
    });
    expect(data.countries).toMatchSnapshot();
    expect(data.trips).toMatchSnapshot();
    expect(data.shareData).toEqual(
      expect.stringMatching(/<script>window\.shareData = {(.*)};<\/script>/)
    );
  });
});
