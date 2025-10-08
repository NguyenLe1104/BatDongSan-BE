const express = require("express");
const router = express.Router();
const loaiNhaDat = require("../controller/LoaiNhaDatController");
const paginate = require("../utils/PhanTrang");
const LoaiNhaDat = require("../models/LoaiNhaDat");
router.get("/", paginate(LoaiNhaDat), loaiNhaDat.getAllLoaiNhaDat);
router.get("/all", loaiNhaDat.getAllLoaiDatKhongPhanTrang);
router.get("/:id", loaiNhaDat.getLoaiNhaDatById);
router.post("/addLoaiNhaDat", loaiNhaDat.addLoaiNhaDat);
router.put("/:id", loaiNhaDat.updateLoaiNhaDat);
router.delete("/:id", loaiNhaDat.deleteLoaiNhaDat);

module.exports = router;