// routes/danhMucYeuThich.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const NhaDat = require("../models/NhaDat");
const DanhMucYeuThich = require("../models/DanhMucYeuThich");
const HinhAnhNhaDat = require("../models/HinhAnhNhaDat");

// Lấy danh sách yêu thích
router.get("/list", verifyToken, async (req, res) => {
    try {
        const favorites = await DanhMucYeuThich.findAll({
            where: { UserId: req.user.id },
            include: [
                {
                    model: NhaDat,
                    as: "nhaDatYeuThich",
                    include: [
                        {
                            model: HinhAnhNhaDat,
                            as: "hinhAnh",
                            attributes: ["id", "url"] // lấy id & url ảnh
                        }
                    ]
                }
            ]
        });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server khi lấy danh sách yêu thích", error: error.message });
    }
});
// Thêm yêu thích
router.post("/add", verifyToken, async (req, res) => {
    try {
        const { NhaDatId } = req.body;

        if (!NhaDatId) {
            return res.status(400).json({ message: "Thiếu NhaDatId" });
        }

        const exists = await DanhMucYeuThich.findOne({
            where: { UserId: req.user.id, NhaDatId }
        });

        if (exists) {
            return res.status(400).json({ message: "Bất động sản đã tồn tại trong danh sách yêu thích" });
        }

        const newFavorite = await DanhMucYeuThich.create({
            UserId: req.user.id,
            NhaDatId
        });

        res.json({ message: "Đã thêm vào danh sách yêu thích", data: newFavorite });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server khi thêm yêu thích", error: error.message });
    }
});

// Xóa yêu thích
router.delete("/remove/:id", verifyToken, async (req, res) => {
    try {
        const nhaDatId = req.params.id;
        const deleted = await DanhMucYeuThich.destroy({
            where: { UserId: req.user.id, NhaDatId: nhaDatId }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy để xóa" });
        }

        res.json({ message: "Đã xóa khỏi danh sách yêu thích" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server khi xóa yêu thích", error: error.message });
    }
});

module.exports = router;
