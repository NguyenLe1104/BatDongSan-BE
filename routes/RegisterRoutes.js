const express = require("express");
const router = express.Router();
const register = require("../controller/RegisterController");

router.post("/register", register.register); // API đăng ký

module.exports = router;