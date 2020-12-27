const sqlite3 = require("sqlite3").verbose();

module.exports = class Database {
  constructor(path) {
    this.db = new sqlite3.Database(path);
  }

  getAllRows(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, [], (error, rows) => {
        if (error) {
          reject(error);
        } else if (!(rows && rows.length)) {
          reject("Database didn't return data!");
        }

        resolve(rows);
      });
    });
  }
};
