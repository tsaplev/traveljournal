const App = require("../components/app/index");

const GoogleMaps = require("../components/maps/index");
const CitiesLayout = require("../components/maps/layouts/cities");
const FlightsLayout = require("../components/maps/layouts/flights");

const { googleMapConfig, selectorsTitles } = require("./config");

require("./style.css");

// Support Emoji on non Apple platforms
const platform = window.navigator.platform;
const isApple = platform.includes("Mac") || platform.includes("iP");

if (!isApple) {
  const script = document.createElement("script");
  script.src = "https://twemoji.maxcdn.com/v/latest/twemoji.min.js";
  script.crossorigin = "anonymous";
  script.onload = () => {
    window.twemoji.parse(document.body);
  };
  const ref = document.querySelector("script");
  ref.parentNode.insertBefore(script, ref);
}

document.addEventListener("DOMContentLoaded", () => {
  // Content tabs switcher
  const tabs = document.querySelector("div.filters-box");
  tabs.addEventListener("click", function ({ target }) {
    const [currentTab] = document.getElementsByClassName(
      "filters-box__item _active"
    );
    if (
      currentTab !== target &&
      target.classList.contains("filters-box__item")
    ) {
      Array.from(tabs.children).forEach((tab) => {
        const contentId = tab.getAttribute("data-content");
        document.getElementsByClassName(contentId)[0].style.display =
          target === tab ? "block" : "none";
        tab.classList.toggle("_active");
      });
    }
  });

  const { cities, flights } = window.shareData;
  const { citiesSelectorTitle, flightsSelectorTitle } = selectorsTitles;
  const maps = {
    CitiesLayout: new CitiesLayout([], citiesSelectorTitle, cities),
    FlightsLayout: new FlightsLayout([], flightsSelectorTitle, flights),
  };

  return new App(
    new GoogleMaps(
      document.getElementById("travel-map"),
      googleMapConfig(maps)
    ),
    maps
  );
});
