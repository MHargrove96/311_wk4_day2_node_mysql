const mysql = require("mysql");

require("dotenv").config();
// console.log(process.env);

const { BD_HOST, BD_USER, BD_PASSWORD, BD_DATABASE } = process.env;

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: BD_HOST,
        user: BD_USER,
        password: BD_PASSWORD,
        database: BD_DATABASE,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
