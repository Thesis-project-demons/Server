var db = require("../data-base/connection");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const jwt =require('jsonwebtoken')
const bcrypt = require("bcryptjs");
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
    console.log(err1, " ",rez)
    if (err1) res.send(err1);
    else  {
    console.log(rez)
    res.send(rez);
    }
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
var admindt = (req, res) => {
  db.query("select * from admin", (err1, result) => {
    if (err1) res.send(err1);
    else res.send(result);
  });
}; 

const update =(req,res)=>{
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    let params={
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      src:req.body.img,
      about:req.body.about,
      email:req.body.email,
      password:hash,
    }
    db.query(`UPDATE admin SET ?WHERE admin_id=${req.body.id}`, params,(err1, rez) => {
      if (err1) res.send(err1);
      else res.send("done");
    });
  })
}


  const login =
  (loginValidation,
  (req, res, next) => {
    db.query(
      `SELECT * FROM admin WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Email or password is incorrect!",
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]["password"],
          (bErr, bResult) => {
            // wrong password
          
            if (bErr) {
              return res.status(401).send({
                msg: "Email or password is incorrect!",
              });
            }
            if (bResult) {
              const token = jwt.sign(
                { id: result[0].id },
                "the-super-strong-secrect",
                { expiresIn: "1h" }
              );
              db.query(
                `UPDATE admin SET login_time = now() WHERE admin_id = '${result[0].admin_id}'`
              );
              return res.status(200).send({
                msg: "Logged in!",
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }
        );
      }
    );
  });

module.exports = {
  admindt,
  getAllUsers,
  getAllMechanic,
  getAllPrices,
  getAllGithub,
  changeGithubRepo,
  getReview,
  login,
  update
};
