async function getTrips(db) {
  const trips = await db.getAllRows(`
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

  return trips.reduce((result, trip) => {
    const currentYear = new Date(trip.arrival).getFullYear();
    if (!result[currentYear]) {
      result[currentYear] = [];
    }
    result[currentYear].push(trip);

    return result;
  }, {});
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

  return countries.map((country) => {
    country.cities = country.cities.split(",").sort().join(", ");
  });
}

async function getVisitedCities(db) {
  const cities = await db.getAllRows(`SELECT lat, lon FROM city`);
  return cities.map((city) => [city.lat, city.lon]);
}

module.exports = {
  getTrips,
  getTripsByCountry,
  getVisitedCities,
};
