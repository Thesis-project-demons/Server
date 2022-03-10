const router = require("express").Router();
const userControle = require("../controllers/mechanic.controller");
router.get("/getAllMechanic",userControle.getAllMechanic)
router.post("/addMechanic" ,userControle.addMechanic )
router.post("/getOrders" , userControle.getOrders)
module.exports = router;
