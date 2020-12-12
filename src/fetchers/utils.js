const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getAllRows = (db, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (error, rows) => {
      if (error) {
        reject(error);
      }

      if (!(rows && rows.length)) {
        reject("Database didn't return data!");
      }

      resolve(rows);
    });
  });
};

module.exports = { monthNames, getAllRows };
