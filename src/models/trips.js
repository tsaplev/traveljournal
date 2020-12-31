async function getTrips(db) {
  let trips = await db.getAllRows(`
    SELECT
    trip.id,
    trip.arrival,
    trip.departure,
    city.name as city,
    city.lat,
    city.lon,
    country.name as country,
    country.code as country_code,
    country.flag as country_flag
    FROM trip
    INNER JOIN city ON city.id = trip.city_id
    INNER JOIN country ON city.country_id = country.id
    ORDER BY date(trip.arrival) ASC
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

async function getVisitedCities(db) {
  let cities = await db.getAllRows(`SELECT lat, lon FROM city`);
  cities = cities.map((city) => [city.lat, city.lon]);

  return cities;
}

module.exports = {
  getTrips,
  getTripsByCountry,
  getVisitedCities,
};
