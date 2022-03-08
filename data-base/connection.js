var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "car",
});

module.exports = connection;
