var db = require("../data-base/connection");

const { signupValidation, loginValidation } = require("./validation.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { off } = require("../data-base/connection");

var getFavorite = (req,res)=> { 

var user_id = req.body.user_id 
db.query(`select fav from favorite where '${user_id}'`,(err,rez)=>{ 

if(err)
res.send(err)
else 
res.send(rez)
})


}



var addFavorite = (req,res)=> { 
var user_id =req.body.user_id 
var mechanic_id = req.body.mechanic_id
db.query(`select  * from  favorite where user_id='${user_id}'` ,(err,rez)=>{
if(err)
res.send(err)
else 
{
if(rez.length==0){ 
var arr = []
arr.push(mechanic_id)
arr = JSON.stringify(arr)
db.query(`INSERT INTO favorite (user_id , fav) values ('${user_id}' , '${arr}')`,(err1,rez1)=> {
if(err1)
res.send(err1)
else 
res.send("Data Created check Your DataBase")
})

}
else 
{
var arr1 = (rez[0].fav)
console.log(arr1)
console.log(typeof arr1)
arr1.push(mechanic_id)
console.log(arr1)
var arr =JSON.stringify(arr1)
db.query(`UPDATE favorite set fav ='${arr}'where user_id ='${user_id}'`,(err2,rez1)=>  {
if(err2)
res.send(err2)
else 
res.send("Data Updated Check Your DataBase")


}   )


}
}
})
}



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
                `INSERT INTO user (username, email, password ,login_time ) VALUES ('${
                  req.body.username
                }', ${db.escape(req.body.email)}, ${db.escape(hash)},NOW())`,
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
    console.log(req.body);
    console.log(req.body.password);

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
              res.status(401).send({
                msg: "Email or password is incorrect!",
              });
            }
            if (bResult) {
              const token = jwt.sign(
                { user_id: result[0].user_id },
                "the-super-strong-secrect",
                { expiresIn: "1h" }
              );
              db.query(
                `UPDATE user SET  last_time_logged = now() WHERE user_id = '${result[0].user_id}'`
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


const getuser =
  (signupValidation,
  (req, res, next) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }
    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    db.query(
      "SELECT * FROM user where user_id = ?",
      decoded.user_id,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results[0],
          message: "Fetch Successfully.",
        });
      }
    );
  });

var getOneUser= (req,res) => { 
var user_id = req.body.user_id ; 
db.query(`SELECT username from user where user_id = '${user_id}'` , (err,rez)=> {
if(err)
res.send(err)
else 
res.send(rez)

})


  }
  var addReview = (req,res)=> { 
   var mechanic_id = req.body.mechanic_id 
   var message = req.body.message 
   var user_name = req.body.user_name 
   var star = req.body.star
   db.query(`select * from  review_users where mechanic_id='${mechanic_id}'` , (err,rez)=> { 
if(err)
res.send(err)
else 
{
if(rez.length==0){

var s = user_name+":"+message+"@"+star

  db.query(`INSERT INTO review_users (mechanic_id , reviews) values ('${mechanic_id}', '${s}')`,(err1,rez1)=>{
if(err1)
res.send(err1)
else 
res.send("Data Added Check Your DataBase")
  })
}
else 
{

var arr = (rez[0].reviews )
console.log(arr)
arr+=','+user_name+':'+message+"@"+star


db.query(`UPDATE review_users set reviews= '${arr}' where mechanic_id = '${mechanic_id}'`,(err1,rez1)=> { 
if(err1)
res.send(err1)
else 
res.send("Data Updated")
})
}
}
})
}

var addReviewStart = (req,res)=> { 
var star = req.body.star
var mechanic_id =  req.body.mechanic_id

db.query(`UPDATE mechanic set stars = stars+'${star}' , peopleCount = peopleCount+1 where mechanic_id ='${mechanic_id}'`,(err,rez)=> { 
if(err)
res.send(err)
else
res.send("Added Done")



})



}

var getReview = (req,res)=> { 
var mechanic_id = req.body.mechanic_id 
db.query(`SELECT * FROM review_users where mechanic_id ='${mechanic_id}'`,(err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez)
})
}


var getMechanic = (req,res)=> { 
var mechanic_id = req.body.mechanic_id 
db.query(`select * from mechanic where mechanic_id = '${mechanic_id}'`,(err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez)
})
}

var deleteFavo =(req,res)=>{ 
mechanic_id = req.body.mechanic_id 
user_id =req.body.user_id 
db.query(`SELECT * FROM favorite where user_id ='${user_id}'`,(err,rez)=> { 
if(err)
res.send(err)
else 
{
console.log(rez[0].fav)
var arr = []
for (let i = 0 ; i <rez[0].fav.length; i ++ ){
if(rez[0].fav[i]!=mechanic_id)
arr.push(rez[0].fav[i])
}
arr = JSON.stringify(arr)
db.query(`UPDATE favorite set fav = '${arr}' where user_id = '${user_id}'`,(err1,rez1)=> { 
if(err1)
res.send(err1)
else 
res.send("Data Updated")
})
}
})
}


var getIdUser = (req,res)=> { 
var email = req.body.email 
db.query(`select  user_id from user where email = '${email}'` , (err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez)
})


}

var getReservation= (req,res)=>{
var user_id = req.body.user_id 
db.query(`SELECT * FROM reservation WHERE user_id = '${user_id}'`,(err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez)
})
} 

var addReservation = (req,res)=> { 
var user_id = req.body.user_id  
var mechanic_id = req.body.mechanic_id  
var work = req.body.work
var date =new Date() 
work = date.getHours()+":"+date.getMinutes()+"AM"+", "+date.getDate()+":"+date.getMonth()+":"+date.getFullYear()+", "+work 
work = JSON.stringify(work)
db.query(`INSERT INTO reservation (user_id , mechanic_id ,reservation  , response) values ('${user_id}' , '${mechanic_id}' , '${work}' , 'still')`,(err,rez)=> { 
if(err){
  console.log(err)
res.send(err)}
else {
console.log("Data Added")
  res.send("Data Added ")

}}) 

}

module.exports = {
  Signup,
  Login,
  getuser,
  addReview , 
  getReview,
  addFavorite,
  getFavorite , 
  getMechanic , 
  deleteFavo , 
  getReservation , 
  addReviewStart  , 
  getOneUser , 
  addReservation , 
  getIdUser
};
