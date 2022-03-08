const router = require("express").Router();
const userroutes = require("../controllers/user.controller.js");

router.post("/signup",userroutes.Signup)
router.post("/login",userroutes.Login)
router.get("/getuser",userroutes.getuser)
router.get("/getreminder",userroutes.getReminder)
router.delete("/delreminder/:id",userroutes.deleteReminder)
router.post("/reminder",userroutes.reminder)


module.exports = router;
