require("dotenv").config;

const LoaiNhaDat = require("../models/LoaiNhaDat");
const { validateFieldsNoSpecialChars } = require("../utils/validators")
exports.getAllLoaiNhaDat = async (req, res) => {
    try {
        const loaiNhaDats = res.paginateResult;
        res.json(loaiNhaDats);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy loại nhà đất" });
    }
};

exports.getLoaiNhaDatById = async (req, res) => {
    try {
        const { id } = req.params;

        const loaiNhaDat = await LoaiNhaDat.findByPk(id);
        if (!loaiNhaDat) {
            return res.status(404).json({ error: "Không tìm thấy loại nhà đất" });
        }

        res.json(loaiNhaDat);
    } catch (error) {
        console.error("Lỗi khi lấy loại nhà đất theo id:", error);
        res.status(500).json({ error: "Lỗi khi lấy loại nhà đất theo id" });
    }
};


exports.addLoaiNhaDat = async (req, res) => {
    try {
        const { MaLoaiDat, TenLoaiDat } = req.body;
        if (!MaLoaiDat || !TenLoaiDat) {
            return res.status(400).json({ error: "Mã loại đất và Tên loại đất không được bỏ trống" });
        }
        if (validateFieldsNoSpecialChars([MaLoaiDat, TenLoaiDat])) {
            return res.status(400).json({ error: "Thông tin có chứa ký tự đặc biệt không hợp lệ" });
        }
        const existsMaLoaiDat = await LoaiNhaDat.findOne({ where: { MaLoaiDat } });
        if (existsMaLoaiDat) return res.status(400).json({ error: "Mã loại nhà đất đã tồn tại" });
        const newMaLoaiDat = await LoaiNhaDat.create({
            MaLoaiDat,
            TenLoaiDat
        });
        return res.status(201).json({
            message: "Thêm loại nhà đất thành công",
        });

    } catch (error) {
        return res.status(500).json({ error: "Lỗi khi thêm loại nhà đất" });
    }
};

exports.updateLoaiNhaDat = async (req, res) => {
    try {
        const { id } = req.params;
        const { MaLoaiDat, TenLoaiDat } = req.body;

        const loaiNhaDat = await LoaiNhaDat.findByPk(id);
        if (!loaiNhaDat) {
            return res.status(404).json({ error: "Không tìm thấy loại nhà đất" });
        }
        if (validateFieldsNoSpecialChars([MaLoaiDat, TenLoaiDat])) {
            return res.status(400).json({ error: "Thông tin có chứa ký tự đặc biệt không hợp lệ" });
        }
        // Chỉ kiểm tra trùng MaLoaiDat nếu người dùng gửi MaLoaiDat mới
        if (MaLoaiDat && MaLoaiDat !== loaiNhaDat.MaLoaiDat) {
            const existsMaLoaiDat = await LoaiNhaDat.findOne({ where: { MaLoaiDat } });
            if (existsMaLoaiDat) {
                return res.status(400).json({ error: "Mã loại nhà đất đã tồn tại" });
            }
        }

        // Cập nhật chỉ các trường được gửi lên (nếu có)
        await loaiNhaDat.update({
            MaLoaiDat: MaLoaiDat || loaiNhaDat.MaLoaiDat,
            TenLoaiDat: TenLoaiDat || loaiNhaDat.TenLoaiDat
        });

        return res.status(200).json({
            message: "Cập nhật loại nhà đất thành công",
            data: loaiNhaDat
        });
    } catch (error) {
        return res.status(500).json({ error: "Lỗi khi cập nhật loại nhà đất" });
    }
};

exports.deleteLoaiNhaDat = async (req, res) => {
    try {
        const { id } = req.params;


        const loaiNhaDat = await LoaiNhaDat.findByPk(id);
        if (!loaiNhaDat) {
            return res.status(404).json({ error: "Không tìm thấy loại nhà đất" });
        }


        await loaiNhaDat.destroy();

        return res.status(200).json({
            message: "Xóa loại nhà đất thành công"
        });

    } catch (error) {
        return res.status(500).json({ error: "Lỗi khi xóa loại nhà đất" });
    }
};
