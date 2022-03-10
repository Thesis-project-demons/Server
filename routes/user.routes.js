const router = require("express").Router();
const userControle = require("../controllers/user.controller");

router.post("/addFavorite",userControle.addFavorite)
router.post("/getFavorite",userControle.getFavorite)
router.post("/signup",userControle.Signup)
router.post("/getMechanic",userControle.getMechanic)
router.post("/login",userControle.Login)
router.get("/getuser",userControle.getuser)
router.post("/addReview" , userControle.addReview)
router.post("/getReview",userControle.getReview)
router.post("/deleteFavo" , userControle.deleteFavo)
router.post("/getReservation",  userControle.getReservation)
router.post("/addReviewStart",userControle.addReviewStart)
router.post("/getOneUser", userControle.getOneUser)
router.post("/addReservation",userControle.addReservation) 
 router.post("/getIdUser" , userControle.getIdUser)
module.exports = router;
