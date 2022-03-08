const router = require("express").Router();
const mechanicControle = require("../controllers/mechanic.controller");
router.post("/login/password",mechanicControle.Login)
router.post("/login/email",mechanicControle.login)
router.post("/signup",mechanicControle.signup)
router.post("/storage",mechanicControle.storage)
module.exports = router;

