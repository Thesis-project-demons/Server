var db = require("../data-base/connection");



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
var arr1 = JSON.parse(rez[0].fav)
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

module.exports={addFavorite,getFavorite}