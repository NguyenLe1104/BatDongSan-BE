const express = require("express");
const router = express.Router();
const profileController = require("../controller/ProfileController");
const { verifyToken } = require("../middlewares/authMiddleware");


router.get("/profile", verifyToken, profileController.getProfile);
router.put("/profile", verifyToken, profileController.updateProfile);
module.exports = router;