const express = require("express");
const router = express.Router();
const loginController = require("../controller/LoginController");

router.post("/login", loginController.login);
router.post("/refresh-token", loginController.refreshToken);
router.post("/logout", loginController.logout);
router.post("/google", loginController.loginGoogle);
module.exports = router;