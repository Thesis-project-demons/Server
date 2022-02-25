var db = require("../data-base/connection");
var getAllUsers = (req, res) => {
  db.query("SELECT * from user ", (err1, rez) => {
    if (err1) res.send(err1);
    else res.send(rez);
  });
};

var getAllMechanic = (req, res) => {
  db.query("SELECT * from mechanic", (err1, rez) => {
    if (err1) res.send(err1);
    else res.send(rez);
  });
};

var getAllPrices = (req, res) => {
  db.query("SELECT * from prices", (err1, rez) => {
    if (err1) res.send(err1);
    else res.send(rez);
  });
};

var getAllGithub = (req, res) => {
  db.query("SELECT * FROM last_github", (err, rez) => {
    if (err) res.send(err);
    else res.send(rez);
  });
};

var changeGithubRepo = (req, res) => {
  var change = req.body.github;
  var a = change.substr(0, change.indexOf("T"));
  var b = change.substr(change.indexOf("T") + 1, change.length);
  b = b.substr(0, b.length - 1);

  console.log(a);
  console.log(b);
  var r = a + " " + b;
  db.query(`insert into last_github (last) VALUES  ('${r}')`, (err1, rez) => {
    if (err1) res.send(err1);
    else res.send("Check Your DataBase ");
  });
};

var getReview = (req, res) => {
  db.query("select * from reviews", (err1, rez) => {
    if (err1) res.send(err1);
    else res.send(rez);
  });
};
module.exports = {
  getAllUsers,
  getAllMechanic,
  getAllPrices,
  getAllGithub,
  changeGithubRepo,
  getReview,
};
