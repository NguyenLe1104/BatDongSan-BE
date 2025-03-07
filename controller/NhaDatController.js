require("dotenv").config();

const NhaDat = require("../models/NhaDat");
const DiaChi = require("../models/DiaChi");
exports.getAllNhaDat = async (req, res) => {
    try {
        const nhaDat = await NhaDat.findAll({
            include: [{ model: DiaChi }]
        });
        res.json(nhaDat);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy nhà đất" });
    }
};

exports.getNhaDatById = async (req, res) => {
    try {
        const { id } = req.params;
        const nhaDat = await NhaDat.findByPk(id, {
            include: [{ model: DiaChi }]
        });

        if (!nhaDat) return res.status(404).json({ error: "Không tìm thấy nhà đất" });

        res.json(nhaDat);
    } catch (error) {
        console.error("Lỗi khi lấy nhà đất theo id:", error);
        res.status(500).json({ error: "Lỗi khi lấy nhà đất theo id" });
    }
};


exports.addNhaDat = async (req, res) => {
    try {
        const {
            MaNhaDat,
            TenNhaDat,
            LoaiNhaDat_id,
            MoTa,
            GiaBan,
            DienTich,
            Huong,
            HinhAnh,
            TrangThai,
            diaChi // Nhận địa chỉ từ request
        } = req.body;

        if (!MaNhaDat || !TenNhaDat || !LoaiNhaDat_id || !TrangThai || !diaChi) {
            return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
        }

        // Kiểm tra MaNhaDat có bị trùng không
        const existingNhaDat = await NhaDat.findOne({ where: { MaNhaDat } });
        if (existingNhaDat) {
            return res.status(400).json({ error: "Mã nhà đất đã tồn tại" });
        }

        // Tạo địa chỉ mới
        const newDiaChi = await DiaChi.create(diaChi);

        // Tạo nhà đất mới với địa chỉ mới
        const newNhaDat = await NhaDat.create({
            MaNhaDat,
            TenNhaDat,
            LoaiNhaDat_id,
            DiaChi_id: newDiaChi.id, // Gán địa chỉ mới
            MoTa,
            GiaBan,
            DienTich,
            Huong,
            HinhAnh,
            TrangThai
        });

        res.status(201).json({ message: "Thêm nhà đất thành công!", data: newNhaDat });
    } catch (error) {
        console.error("Lỗi khi thêm nhà đất:", error);
        return res.status(500).json({ error: "Lỗi máy chủ" });
    }
};

exports.updateNhaDat = async (req, res) => {
    try {
        const { id } = req.params;
        const { MaNhaDat, diaChi, ...updateData } = req.body;

        const nhaDat = await NhaDat.findByPk(id);
        if (!nhaDat) return res.status(404).json({ error: "Không tìm thấy nhà đất" });

        // Kiểm tra nếu MaNhaDat mới bị trùng với một nhà đất khác
        if (MaNhaDat) {
            const existingNhaDat = await NhaDat.findOne({ where: { MaNhaDat } });
            if (existingNhaDat && existingNhaDat.id !== Number(id)) {
                return res.status(400).json({ error: "Mã nhà đất đã tồn tại" });
            }
        }

        // Xử lý cập nhật địa chỉ nếu có trong request
        if (diaChi) {
            if (nhaDat.DiaChi_id) {
                // Nếu nhà đất đã có địa chỉ, cập nhật địa chỉ hiện tại
                await DiaChi.update(diaChi, { where: { id: nhaDat.DiaChi_id } });
            } else {
                // Nếu chưa có địa chỉ, tạo mới và gán vào nhà đất
                const newDiaChi = await DiaChi.create(diaChi);
                updateData.DiaChi_id = newDiaChi.id;
            }
        }

        // Cập nhật thông tin nhà đất
        await nhaDat.update(updateData);

        // Lấy dữ liệu mới sau khi cập nhật
        const updatedNhaDat = await NhaDat.findByPk(id, { include: DiaChi });

        res.status(200).json({ message: "Cập nhật thành công!", data: updatedNhaDat });
    } catch (error) {
        console.error("Lỗi khi cập nhật nhà đất:", error);
        return res.status(500).json({ error: "Lỗi máy chủ" });
    }
};


exports.deleteNhaDat = async (req, res) => {
    try {
        const { id } = req.params;
        const nhaDat = await NhaDat.findByPk(id);
        if (!nhaDat) return res.status(404).json({ error: "Không tìm thấy nhà đất" });

        // Tìm địa chỉ liên quan trước khi xóa nhà đất
        const diaChi = await DiaChi.findByPk(nhaDat.DiaChi_id);

        // Xóa nhà đất
        await nhaDat.destroy();

        // Nếu có địa chỉ, xóa luôn địa chỉ
        if (diaChi) {
            await diaChi.destroy();
        }

        return res.status(200).json({ message: "Xóa nhà đất và địa chỉ thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa nhà đất:", error);
        return res.status(500).json({ error: "Lỗi máy chủ" });
    }
};

