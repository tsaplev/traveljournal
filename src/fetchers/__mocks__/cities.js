const getAllVisitedCities = jest.fn().mockResolvedValue({
  1995: [
    {
      id: 1,
      arrival: "1995-05-10",
      departure: "1995-05-20",
      city: "New York",
      lat: 40.73061,
      lon: -73.935242,
      country: "United States of America",
      country_code: "US",
      country_flag: "🇺🇸",
    },
  ],
  2007: [
    {
      id: 2,
      arrival: "2007-11-05",
      departure: "2007-11-18",
      city: "Sydney",
      lat: -33.865143,
      lon: 151.2099,
      country: "Australia",
      country_code: "AU",
      country_flag: "🇦🇺",
    },
  ],
  2014: [
    {
      id: 2,
      arrival: "2014-05-07",
      departure: "2014-05-08",
      city: "Moscow",
      lat: 55.7558,
      lon: 37.6173,
      country: "Russia",
      country_code: "RU",
      country_flag: "🇷🇺",
    },
    {
      id: 2,
      arrival: "2014-02-20",
      departure: "2014-03-26",
      city: "Sevastopol",
      lat: 44.6166,
      lon: 33.5254,
      country: "Russia",
      country_code: "RU",
      country_flag: "🇷🇺",
    },
  ],
});

const getCitiesAsList = jest.fn().mockReturnValue({
  1995: [{ country: "🇺🇸", city: "New York", date: "May 10 - 20" }],
  2007: [{ country: "🇦🇺", city: "Sydney", date: "November 5 - 18" }],
  2014: [
    { country: "🇷🇺", city: "Moscow", date: "May 7 - 8" },
    { country: "🇷🇺", city: "Sevastopol", date: "February 20 - March 26" },
  ],
});

const getListOfCitiesSortedByCountry = jest.fn().mockResolvedValue([
  { flag: "🇷🇺", name: "Russia", cities: "Moscow, Sevastopol" },
  { flag: "🇦🇺", name: "Australia", cities: "Sydney" },
  { flag: "🇺🇸", name: "United States of America", cities: "New York" },
]);

module.exports = {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
};
