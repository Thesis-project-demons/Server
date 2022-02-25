const router = require("express").Router();
const userControle = require("../controllers/admin.controller");
router.get("/getAllUsers",userControle.getAllUsers)
router.get("/getAllMechanic", userControle.getAllMechanic)
router.get("/getAllPrices" , userControle.getAllPrices)
router.get("/getAllGithub",userControle.getAllGithub)
router.post("/changeGithubRepo" , userControle.changeGithubRepo)
router.get("/getReview", userControle.getReview)
module.exports = router;

