const commonInfo = {
  siteTitle: "",
  title: "",
  subTitle: "",
  googleMapApiKey: "",
  flightradarUsername: "",
};

const pathToDatabase = `${__dirname}/../db.sqlite3`;

const selectorsTitles = {
  citiesSelectorTitle: "📍Cities",
  flightsSelectorTitle: "✈️ Flights",
};

const googleMapConfig = (maps) => {
  const mapTypeIds = Object.keys(maps);
  const [mapTypeId] = mapTypeIds;
  return {
    center: { lat: 25, lng: 62 },
    zoom: 2,
    scrollwheel: false,
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeId,
    mapTypeControlOptions: {
      mapTypeIds,
      style: google.maps.MapTypeControlStyle.DEFAULT,
    },
  };
};

module.exports = {
  commonInfo,
  pathToDatabase,
  selectorsTitles,
  googleMapConfig,
};
