const router = require("express").Router();
const userControle = require("../controllers/user.controller");

router.post("/addFavorite",userControle.addFavorite)
router.post("/getFavorite",userControle.getFavorite)


module.exports = router;
