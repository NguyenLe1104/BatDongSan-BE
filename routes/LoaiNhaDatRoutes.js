const express = require("express");
const router = express.Router();
const loaiNhaDat = require("../controller/LoaiNhaDatController");

router.get("/", loaiNhaDat.getAllLoaiNhaDat);
router.get("/:id", loaiNhaDat.getLoaiNhaDatById);
router.post("/addLoaiNhaDat", loaiNhaDat.addLoaiNhaDat);
router.put("/:id", loaiNhaDat.updateLoaiNhaDat);
router.delete("/:id", loaiNhaDat.deleteLoaiNhaDat);

module.exports = router;