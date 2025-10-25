const express = require("express");
const router = express.Router();
const chatBotController = require("../controller/ChabotController");

router.post("/chat", chatBotController.chatbot);

module.exports = router;