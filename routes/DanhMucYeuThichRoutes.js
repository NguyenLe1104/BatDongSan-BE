// routes/danhMucYeuThich.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const danhMucYeuThichController = require("../controller/DanhMucYeuThichController");

// Lấy danh sách yêu thích
router.get("/list", verifyToken, danhMucYeuThichController.list);

// Thêm yêu thích
router.post("/add", verifyToken, danhMucYeuThichController.add);

// Xóa yêu thích
router.delete("/remove/:id", verifyToken, danhMucYeuThichController.remove);

module.exports = router;
