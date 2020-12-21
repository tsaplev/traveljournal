import App from "./components/app/index";

import GoogleMaps from "./components/maps/index";
import CitiesLayout from "./components/maps/layouts/cities";
import FlightsLayout from "./components/maps/layouts/flights";

import { googleMapConfig, selectorsTitles } from "./config";

import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelector("div.filters-box");
  tabs.addEventListener("click", function ({ target }) {
    if (target.classList.contains("filters-box__item")) {
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
