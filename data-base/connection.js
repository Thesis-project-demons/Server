var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "firasj20",
  database: "car",
});

module.exports = connection;
