const router = require("express").Router();
const userroutes = require("../controllers/user.controller.js");

router.post("/signup",userroutes.Signup)

module.exports = router;
