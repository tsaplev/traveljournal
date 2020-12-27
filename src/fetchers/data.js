const {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
} = require("./cities");
const { generateShareData } = require("./utils");
const { getAllFlights } = require("./flights");
const config = require("../config");
const { databasePath, commonInfo } = config;
const Database = require("./db");

const getHtmlForCountries = async (countries) => {
  const html = countries.reduce((output, country) => {
    output += `
    <ul class="countries-list">
      <li class="countries-list__country">
        <span class="country">${country.flag} ${country.name}: </span>${country.cities}
      </li>
    </ul>
    `;
    return output;
  }, "");

  return html;
};

const getHtmlForVists = async (visits) => {
  const html = Object.keys(visits)
    .reverse()
    .reduce((output, year) => {
      const trips = visits[year];
      output += `<p><strong class="year">${year}</strong><br>`;
      output += trips.reduce((output, trip) => {
        output += `<span class='log'>${trip.country} ${trip.city} <span class='time'>${trip.date}</span></span><br>`;
        return output;
      }, "");
      output += `</p>`;
      return output;
    }, "");

  return html;
};

const getHtmlData = async () => {
  const db = new Database(databasePath);

  const cities = await getAllVisitedCities(db);
  const countries = await getListOfCitiesSortedByCountry(db);
  const flights = await getAllFlights("tsaplev");

  const countriesLayout = await getHtmlForCountries(countries);
  const visits = await getHtmlForVists(getCitiesAsList({ ...cities }));
  const shareData = generateShareData({ cities, flights });

  return {
    ...commonInfo,
    shareData,
    countries: countriesLayout,
    visits,
  };
};

module.exports = { getHtmlData };
