const trips = [
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
  {
    id: 3,
    arrival: "2014-01-07",
    departure: "2014-01-09",
    city: "Moscow",
    lat: 55.7558,
    lon: 37.6173,
    country: "Russia",
    country_code: "RU",
    country_flag: "🇷🇺",
  },
  {
    id: 4,
    arrival: "2014-02-20",
    departure: "2014-03-26",
    city: "Sevastopol",
    lat: 44.6166,
    lon: 33.5254,
    country: "Russia",
    country_code: "RU",
    country_flag: "🇷🇺",
  },
];

const countries = [
  { flag: "🇦🇺", name: "Australia", cities: "Sydney" },
  { flag: "🇷🇺", name: "Russia", cities: "Sevastopol,Moscow" },
  { flag: "🇺🇸", name: "United States of America", cities: "New York" },
];

module.exports = { trips, countries };
