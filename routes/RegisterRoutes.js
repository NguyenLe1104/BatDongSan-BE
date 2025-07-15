const express = require("express");
const router = express.Router();
const register = require("../controller/RegisterController");

router.post("/register/send-otp", register.register);
router.post("/register/confirm", register.confirmRegister);

module.exports = router;