var db = require("../data-base/connection");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const jwt =require('jsonwebtoken')
const bcrypt = require("bcryptjs");

const signup =
  (signupValidation,
  (req, res, next) => {
    db.query(
      `SELECT * FROM mechanic WHERE LOWER(email) = LOWER(${db.escape(
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
                `INSERT INTO mechanic ( email, password) VALUES ( ${db.escape(req.body.email)}, ${db.escape(hash)})`,
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
  
    
var login=(req,res)=>{
    db.query(`SELECT * FROM mechanic WHERE email=?`,[req.body.email],(err,rest)=>{
        if (err) res.send("not allowed");
        res.send(rest)
    })

}
var Login=(loginValidation,
  (req, res, next) => {
    db.query(
      `SELECT * FROM mechanic WHERE mechanic_id = ${db.escape(req.body.id)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: "Password is incorrect!",
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
                msg: "Password is incorrect!",
              });
            }
            if (bResult) {
              const token = jwt.sign(
                { id: result[0].id },
                "the-super-strong-secrect",
                { expiresIn: "1h" }
              );
              db.query(
                `UPDATE mechanic SET login_time = now() WHERE mechanic_id = '${result[0].mechanic_id}'`
              );
              return res.status(200).send({
                msg: "Logged in!",
                token,
                user: result[0],
              });
            }
            return res.status(401).send({
              msg: "Password is incorrect!",
            });
          }
        );
      }
    );
  });

var storage=(req,res)=>{
  db.query(`INSERT INTO storage (image,title,price) VALUES ('${req.body.image}','${req.body.title}','${req.body.price}')`,(err,data)=>{
    if(err){
      res.send(err)
    }else{
      res.status(201).send(data)
    }
  })
}
module.exports={
    login,
    signup,
    Login,
    storage
}