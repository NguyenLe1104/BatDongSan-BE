const express = require("express");
const router = express.Router();
const khachHangController = require("../controller/KhachHangController")


router.get("/", khachHangController.getAllKhachHang);
router.get("/:id", khachHangController.getKhachHangById);
router.post("/", khachHangController.addKhachHang);
router.put("/:id", khachHangController.updateKhachHang);
router.delete("/:id", khachHangController.deleteKhachHang);

module.exports = router;