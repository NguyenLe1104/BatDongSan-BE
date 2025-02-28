const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Chỉ ADMIN mới có quyền truy cập các API này
router.get("/", verifyToken, isAdmin, userController.getAllUsers);
router.get("/:id", verifyToken, isAdmin, userController.getUserById);
router.post("/addUser", verifyToken, isAdmin, userController.addUser);
router.put("/:id", verifyToken, isAdmin, userController.updateUser);

module.exports = router;
