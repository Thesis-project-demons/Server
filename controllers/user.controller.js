var db = require("../data-base/connection");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Signup =
  (signupValidation,
  (req, res, next) => {
    db.query(
      `SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          res.status(409).send({
            msg: "This user is already in use!",
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).send({
                msg: err,
              });
            } else {
              // has hashed password => add to database
              db.query(
                `INSERT INTO user (username, email, password) VALUES ('${
                  req.body.username
                }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
                (err, result) => {
                  if (err) {
                    throw err;
                  }
                  res.status(201).send({
                    msg: "The user has been registerd with us!",
                  });
                }
              );
            }
          });
        }
      }
    );
  });

module.exports = {
  Signup,
};
