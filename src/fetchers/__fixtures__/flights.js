const flightsData = {
  paths: [
    ["43.398333", "132.146667", "55.971667", "37.415000", "#f89800"],
    ["55.971667", "37.415000", "40.639750", "-73.778925", "#f89800"],
  ],
  points: [
    {
      count: 2,
      icao: "UUEE",
      iata: "SVO",
      city: "Moscow",
      name: "Sheremetyevo",
      lat: "55.971667",
      lon: "37.415000",
      country: "RU",
      url: "moscow-sheremetyevo-uuee",
    },
    {
      count: 1,
      icao: "UHWW",
      iata: "VVO",
      city: "Vladivostok",
      name: "Vladivostok",
      lat: "43.398333",
      lon: "132.146667",
      country: "RU",
      url: "vladivostok-vladivostok-uhww",
    },
    {
      count: 1,
      icao: "KJFK",
      iata: "JFK",
      city: "New York",
      name: "John F Kennedy",
      lat: "40.639750",
      lon: "-73.778925",
      country: "US",
      url: "new-york-john-f-kennedy-kjfk",
    },
  ],
};

module.exports = { flightsData };
