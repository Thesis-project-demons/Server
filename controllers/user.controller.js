var db = require("../data-base/connection");
const { signupValidation, loginValidation } = require("./validation.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

var num1 = 0
var num2 = 0
var num3 = 0
var num4 = 0
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
                `INSERT INTO user (username, email, password,PhoneNumber) VALUES ('${
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
  const Login =
  (loginValidation,
  (req, res, next) => {
    db.query(
      `SELECT * FROM user WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
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
              throw bErr;
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
                `UPDATE user SET last_login = now() WHERE user_id = '${result[0].user_id}'`
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
// const Getuser =
//   (signupValidation,
//   (req, res, next) => {
//     if (
//       !req.headers.authorization ||
//       !req.headers.authorization.startsWith("Bearer") ||
//       !req.headers.authorization.split(" ")[1]
//     ) {
//       return res.status(422).json({
//         message: "Please provide the token",
//       });
//     }
//     const theToken = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(theToken, "the-super-strong-secrect");
//     console.log(req.headers.authorization)
//     db.query(
//       "SELECT * FROM user where user_id=?",
//       decoded.user_id,
//       function (error, results, fields) {
//         if (error) throw error;
//         return res.send({
//           error: false,
//           data: results[0],
//           message: "Fetch Successfully.",
//         });
//       }
//     );
//   });
const profildata =(req,res)=>{
 let query ='SELECT * FROM user'
 db.query(query,(err,data)=>{
   if(err){res.send(err)}
    res.send(data)
 })
}

function sendTextMessage(num) {

  var firstNum = Math.floor(Math.random() * 10)
  num1 = firstNum
  var secondNum = Math.floor(Math.random() * 10)
  num2 = secondNum
  var thirdNum = Math.floor(Math.random() * 10)
  num3 = thirdNum
  var fourthNum = Math.floor(Math.random() * 10)
  num4 = fourthNum
  client.messages.create({
    body: 'your verification code is ' + firstNum + '' + secondNum + '' + thirdNum + '' + fourthNum,
    to: '+21652049969',
    from: '+19148098893'
 }).then(message => console.log(message))
   .catch(error => console.log(error))
}

function resetPassword() {
  var firstNum = Math.floor(Math.random() * 10)
  num1 = firstNum
  var secondNum = Math.floor(Math.random() * 10)
  num2 = secondNum
  var thirdNum = Math.floor(Math.random() * 10)
  num3 = thirdNum
  var fourthNum = Math.floor(Math.random() * 10)
  num4 = fourthNum
  client.messages.create({
    body: 'your reset password code is ' + firstNum + '' + secondNum + '' + thirdNum + '' + fourthNum,
    to: '+21652049969',
    from: '+19148098893'
 }).then(message => console.log(message))
   .catch(error => console.log(error))
}
module.exports = {
  Signup,
  Login,
profildata,
resetPassword,
sendTextMessage
};
