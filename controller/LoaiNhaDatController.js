require("dotenv").config;

const LoaiNhaDat = require("../models/LoaiNhaDat");

exports.getAllLoaiNhaDat = async (req, res) => {
    try {
        const loaiNhaDats = await LoaiNhaDat.findAll();
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
        const { TenLoaiDat } = req.body;
        const loaiNhaDat = await LoaiNhaDat.findByPk(req.param.id);
        if (!loaiNhaDat) return res.status(404).json({ error: "Không tìm thấy loại nhà đất" });
        if (!TenLoaiDat)
            return res.status(400).json({ error: "Tên loại đất không được bỏ trống" });
        await loaiNhaDat.update({ TenLoaiDat });
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
