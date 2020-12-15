const sqlite3 = require("sqlite3").verbose();
const { queryAllRows, dateToHRString } = require("./utils");
const { databasePath } = require("../config");

const db = new sqlite3.Database(databasePath);

const getAllVisitedCities = async () => {
  const query = `
    SELECT
    visit.id,
    visit.arrival,
    visit.departure,
    city.name as city,
    city.lat,
    city.lon,
    country.name as country,
    country.code as country_code,
    country.flag as country_flag
    FROM visit
    INNER JOIN city ON city.id = visit.city_id
    INNER JOIN country ON city.country_id = country.id
    ORDER BY date(visit.arrival) ASC
  `;

  let visits = await queryAllRows(db, query);

  visits = visits.reduce((result, visit) => {
    const currentYear = new Date(visit.arrival).getFullYear();
    if (!result[currentYear]) {
      result[currentYear] = [];
    }
    result[currentYear].push(visit);

    return result;
  }, {});

  return visits;
};

const getCitiesAsList = (visits) => {
  Object.keys(visits)
    .reverse()
    .map((year) => {
      visits[year] = visits[year].map((trip) => {
        return {
          country: trip.country_flag ? trip.country_flag : trip.country_code,
          city: trip.city,
          date: dateToHRString(trip.arrival, trip.departure),
        };
      });
    });

  return visits;
};

const getListOfCitiesSortedByCountry = async () => {
  const query = `
    SELECT 
    country.flag,
    country.name,
    GROUP_CONCAT(city.name) as cities
    FROM country
    INNER JOIN city ON country.id = city.country_id
    GROUP BY country.id
    ORDER BY country.name
  `;

  let countries = await queryAllRows(db, query);

  countries.map((country) => {
    country.cities = country.cities.split(",").sort().join(", ");
  });

  return countries;
};

module.exports = {
  getAllVisitedCities,
  getCitiesAsList,
  getListOfCitiesSortedByCountry,
};
