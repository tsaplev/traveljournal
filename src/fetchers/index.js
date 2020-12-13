const {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
} = require("./cities");
const { generateShareData } = require("./utils");
const { getAllFlights } = require("./flights");
const { commonInfo } = require("../config");

const getHtmlForCountries = async () => {
  const countries = await getListOfCitiesSortedByCountry();
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

const getHtmlForVists = async (cities) => {
  const visits = getCitiesAsList({ ...cities });
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
  const cities = await getAllVisitedCities();
  const flights = await getAllFlights(commonInfo.flightradarUsername);
  const countries = await getHtmlForCountries();
  const visits = await getHtmlForVists(cities);
  const shareData = generateShareData({ cities, flights });

  return {
    ...commonInfo,
    shareData,
    countries,
    visits,
  };
};

module.exports = { getHtmlForCountries, getHtmlForVists, getHtmlData };
