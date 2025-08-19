const express = require("express");
const router = express.Router();
const { changePassword } = require("../controller/DoiMatKhauUserController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.put("/change-password", verifyToken, changePassword);
module.exports = router;