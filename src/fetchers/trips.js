const { formatDate } = require("./utils");

async function getTrips(db) {
  let trips = await db.getAllRows(`
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
  `);

  trips = trips.reduce((result, trip) => {
    const currentYear = new Date(trip.arrival).getFullYear();
    if (!result[currentYear]) {
      result[currentYear] = [];
    }
    result[currentYear].push(trip);

    return result;
  }, {});

  return trips;
}

function getCitiesAsList(trips) {
  Object.keys(trips)
    .reverse()
    .map((year) => {
      trips[year] = trips[year].map((trip) => {
        return {
          country: trip.country_flag ? trip.country_flag : trip.country_code,
          city: trip.city,
          date: formatDate(trip.arrival, trip.departure),
        };
      });
    });

  return trips;
}

async function getTripsByCountry(db) {
  const countries = await db.getAllRows(`
    SELECT 
    country.flag,
    country.name,
    GROUP_CONCAT(city.name) as cities
    FROM country
    INNER JOIN city ON country.id = city.country_id
    GROUP BY country.id
    ORDER BY country.name
  `);

  countries.map((country) => {
    country.cities = country.cities.split(",").sort().join(", ");
  });

  return countries;
}

module.exports = {
  getTrips,
  getCitiesAsList,
  getTripsByCountry,
};
