const express = require("express");
const { uploadMultiple } = require("../middlewares/uploadCloudinary");

const router = express.Router();
const baiVietController = require("../controller/BaiVietController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
router.post("/", verifyToken, checkRole(["KHACHHANG", "ADMIN"]), uploadMultiple, baiVietController.taoBaiViet);

router.get("/", baiVietController.layBaiVietDaDuyet);
router.get("/admin/cho-duyet", verifyToken, checkRole(["ADMIN"]), baiVietController.layBaiChoDuyet);
router.patch("/admin/:id/duyet", verifyToken, checkRole(["ADMIN"]), baiVietController.duyetBaiViet);
router.patch("/admin/:id/tu-choi", verifyToken, checkRole(["ADMIN"]), baiVietController.tuChoiBaiViet);
module.exports = router;
