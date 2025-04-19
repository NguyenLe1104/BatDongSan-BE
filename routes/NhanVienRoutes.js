const express = require("express");
const router = express.Router();
const nhanVienController = require("../controller/NhanVienController");

router.get("/", nhanVienController.getAllNhanVien);
router.get("/:id", nhanVienController.getNhanVienById);
router.post("/", nhanVienController.addNhanVien);
router.put("/:id", nhanVienController.updateNhanVien);
router.delete("/:id", nhanVienController.deleteNhanVien);

module.exports = router;

