const express = require("express");
const router = express.Router();
const batDongSanNoiBat = require("../controller/BatDongSanNoiBatController");

router.get("/batDongSanNoiBat", batDongSanNoiBat.getBatDongSanNoiBat);
module.exports = router;