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

const queryAllRows = (db, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (error, rows) => {
      if (error) {
        reject(error);
      } else if (!(rows && rows.length)) {
        reject("Database didn't return data!");
      }

      resolve(rows);
    });
  });
};

const generateShareData = (data) => {
  return `<script>window.shareData = ${JSON.stringify(data)};</script>`;
};

module.exports = { monthNames, generateShareData, queryAllRows };
