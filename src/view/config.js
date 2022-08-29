const { getCurrentLanguage } = require("./utils");

const commonInfo = {
  siteTitle: "",
  title: "",
  googleMapApiKey: "",
  flightradarUsername: "",
};

const databasePath = `${__dirname}/../../db.sqlite3`;

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

const getUserLang = (defaultLang) => {
  return getCurrentLanguage() || defaultLang;
};

const selectorsTitles = () => {
  const isMobile = window.innerWidth < 490 || deviceType() !== "desktop";
  const lang = getUserLang("en");

  const getTitle = (key) => {
    const dictionary = {
      "📍": {
        ru: "📍 Города",
        en: "📍 Cities",
      },
      "✈️": {
        ru: "✈️ Перелёты",
        en: "✈️ Flights",
      }
    };

    const label = dictionary[key][lang] ? dictionary[key][lang] : key;

    return isMobile ? key : label;
  };

  return {
    citiesSelectorTitle: getTitle("📍"),
    flightsSelectorTitle: getTitle("✈️"),
  };
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
