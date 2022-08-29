const {
  getTrips,
  getTripsByCountry,
  getVisitedCities,
} = require("../models/trips");
const { getFlights } = require("../models/flights");
const { formatDate, monthNames, monthNamesRu } = require("../models/utils");
const config = require("./config");
const { databasePath, commonInfo } = config;
const Database = require("../models/db");

function generateShareData(data) {
  return `<script>window.shareData = ${JSON.stringify(data)};</script>`;
}

function getCitiesAsList(trips, lang) {
  let monthsList = lang === "ru" ? monthNamesRu : monthNames;

  Object.keys(trips)
    .reverse()
    .map((year) => {
      trips[year] = trips[year].map((trip) => {
        return {
          country: trip.country_flag ? trip.country_flag : trip.country_code,
          city: trip.city,
          date: formatDate(trip.arrival, trip.departure, monthsList),
        };
      });
    });

  return trips;
}

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

function getHtmlForVisits(trips, lang) {
  return Object.keys(trips)
    .reverse()
    .reduce((output, year) => {
      const _trips = trips[year];
      output += `<p><strong class="year">${year}</strong><br>`;
      output += _trips.reduce((output, trip) => {
        output += `<span class="trip">${trip.country} ${trip.city} <span class="time">${trip.date}</span></span><br>`;
        return output;
      }, "");
      output += `</p>`;
      return output;
    }, "");
}

async function getHtmlData(lang = "") {
  const db = new Database(databasePath);

  const trips = await getTrips(db, lang);
  const cities = await getVisitedCities(db);
  const countries = await getTripsByCountry(db, lang);
  const flights = await getFlights("tsaplev");

  const countriesLayout = await getHtmlForCountries(countries);
  const tripsList = getHtmlForVisits(
    getCitiesAsList({ ...trips }, lang),
    lang
  );
  const shareData = generateShareData({ cities, flights });

  return {
    ...commonInfo,
    shareData,
    cities: cities,
    countries: countriesLayout,
    trips: tripsList,
  };
}

module.exports = { getHtmlData };
