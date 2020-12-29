const { getTrips, getCitiesAsList, getTripsByCountry } = require("./trips");
const { generateShareData } = require("./utils");
const { getFlights } = require("./flights");
const config = require("../config");
const { databasePath, commonInfo } = config;
const Database = require("./db");

async function getHtmlForCountries(countries) {
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
}

async function getHtmlForVists(trips) {
  const html = Object.keys(trips)
    .reverse()
    .reduce((output, year) => {
      const _trips = trips[year];
      output += `<p><strong class="year">${year}</strong><br>`;
      output += _trips.reduce((output, trip) => {
        output += `<span class='log'>${trip.country} ${trip.city} <span class='time'>${trip.date}</span></span><br>`;
        return output;
      }, "");
      output += `</p>`;
      return output;
    }, "");

  return html;
}

async function getHtmlData() {
  const db = new Database(databasePath);

  const cities = await getTrips(db);
  const countries = await getTripsByCountry(db);
  const flights = await getFlights("tsaplev");

  const countriesLayout = await getHtmlForCountries(countries);
  const trips = await getHtmlForVists(getCitiesAsList({ ...cities }));
  const shareData = generateShareData({ cities, flights });

  return {
    ...commonInfo,
    shareData,
    countries: countriesLayout,
    trips,
  };
}

module.exports = { getHtmlData };
