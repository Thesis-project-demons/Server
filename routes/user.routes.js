const router = require("express").Router();
const userroutes = require("../controllers/user.controller.js");

router.post("/signup",userroutes.Signup)
router.post("/login",userroutes.Login)
router.get("/getuser",userroutes.getuser)


module.exports = router;
