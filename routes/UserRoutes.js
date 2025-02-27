const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/addUser", userController.addUser);
router.put("/:id", userController.updateUser);
module.exports = router;