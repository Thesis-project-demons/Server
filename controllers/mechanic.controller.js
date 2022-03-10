var db = require("../data-base/connection");
var addMechanic = (req,res)=> { 
var email = req.body.email  ; 
var password = req.body.password 
var location = req.body.location 
var namePlace = req.body.namePlace ; 
var coordinate  = req.body.coordinate
var phone = req.body.phone 
var address = req.body.address 
var image = req.body.image
db.query(`INSERT INTO mechanic (email , password, location , namePlace, cordinate , address , phone , login_time  ,subscription , stars , peopleCount , image)  values (
'${email}' , '${password}' , '${location}' , '${namePlace}' , '${coordinate}' , '${address}' , 
'${phone}' , now() , 1 , 0,0 , '${image}')`,(err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez) 
})
}

var getAllMechanic =(req,res)=>{
db.query("select *  from mechanic ",(err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez)
})
}

var getOrders = (req,res)=> { 

var mechanic_id = req.body.mechanic_id 
db.query(`SELECT * FROM  reservation where mechanic_id ='${mechanic_id}'`,(err,rez)=> { 
if(err)
res.send(err)
else 
res.send(rez)
})

}

module.exports={addMechanic , getAllMechanic , getOrders}