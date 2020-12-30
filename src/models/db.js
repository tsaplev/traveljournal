const sqlite3 = require("sqlite3");

class Database {
  constructor(path = ":memory:") {
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
}

module.exports = Database;
