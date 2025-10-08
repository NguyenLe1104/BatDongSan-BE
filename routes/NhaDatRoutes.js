const express = require("express");
const router = express.Router();
const nhaDatController = require("../controller/NhaDatController");
const paginate = require("../utils/PhanTrang");
const { uploadMultiple } = require("../middlewares/uploadCloudinary");
const NhaDat = require("../models/NhaDat");
const LoaiNhaDat = require("../models/LoaiNhaDat");
const HinhAnhNhaDat = require("../models/HinhAnhNhaDat")
const NhanVien = require("../models/NhanVien")
const User = require("../models/User")
router.get("/search", nhaDatController.searchNhaDat);
router.get(
    "/",
    paginate(NhaDat, [
        {
            model: LoaiNhaDat,
            attributes: ["id", "TenLoaiDat"],
        },
        {
            model: HinhAnhNhaDat,
            as: "hinhAnh",
            attributes: ["url"],
        },
        {
            model: NhanVien,
            include: [User], // để lôi luôn thông tin User của nhân viên
        },
    ]),
    nhaDatController.getAllNhaDat
);

router.put("/:id/assign", nhaDatController.assignNhaDatToNhanVien);

router.get("/:id", nhaDatController.getNhaDatById);
router.post("/addNhaDat", uploadMultiple, nhaDatController.addNhaDat);
router.put("/:id", uploadMultiple, nhaDatController.updateNhaDat);

router.delete("/:id", nhaDatController.deleteNhaDat);
router.get("/:id/related", nhaDatController.getRelatedNhaDat);

module.exports = router;