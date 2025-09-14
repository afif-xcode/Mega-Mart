const { signup, verifyOtp } = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/verifyOtp", verifyOtp);

module.exports = router;
