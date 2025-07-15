const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// Chỉ ADMIN mới có quyền truy cập các API này
router.get("/profile", verifyToken, userController.getProfile);
router.get("/", verifyToken, checkRole(["ADMIN"]), userController.getAllUsers);
router.get("/:id", verifyToken, checkRole(["ADMIN"]), userController.getUserById);
router.post("/addUser", verifyToken, checkRole(["ADMIN"]), userController.addUser);
router.put("/:id", verifyToken, checkRole(["ADMIN"]), userController.updateUser);
router.get("/profile", verifyToken, userController.getProfile);
module.exports = router;
