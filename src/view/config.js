const commonInfo = {
  siteTitle: "",
  title: "",
  googleMapApiKey: "",
  flightradarUsername: "",
};

const databasePath = `${__dirname}/../../db.sqlite3`;

const selectorsTitles = {
  citiesSelectorTitle: "📍Cities",
  flightsSelectorTitle: "✈️ Flights",
};

const deviceType = () => {
  const ua = window.navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

const googleMapConfig = (maps) => {
  const isDesktop = deviceType() === "desktop";
  const mapTypeIds = Object.keys(maps);
  const [mapTypeId] = mapTypeIds;
  return {
    center: isDesktop ? { lat: 25, lng: -2.5 } : { lat: 0, lng: 0 },
    zoom: isDesktop ? 2 : 1,
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
  databasePath,
  selectorsTitles,
  googleMapConfig,
};
