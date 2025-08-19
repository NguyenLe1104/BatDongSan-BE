const LichHen = require("../models/LichHen");
const KhachHang = require("../models/KhachHang");
exports.datLichHen = async (req, res) => {
    try {
        const { nhaDatId, NgayHen } = req.body;
        const khachHang = await KhachHang.findOne({ where: { User_id: req.user.id } });
        if (!khachHang) {
            return res.status(400).json({ message: "Khách hàng không tồn tại" });
        }

        if (!nhaDatId || !NgayHen) {
            return res.status(400).json({ message: "Thiếu thông tin cần thiết để đặt lịch" });
        }
        const lichHen = await LichHen.create({
            NhaDat_id: nhaDatId,
            KhachHang_id: khachHang.id,
            NhanVien_id: null,
            NgayHen,
            TrangThai: 0
        });


        return res.status(201).json({ message: "Đặt lịch hẹn thành công, vui lòng chờ duyệt", lichHen });

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

};

exports.duyetLichHen = async (req, res) => {
    try {
        const { id } = req.params;
        const { nhanVienId } = req.body;

        const lichHen = await LichHen.findByPk(id);
        if (!lichHen) return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });

        const trungLich = await LichHen.findOne({
            where: {
                NhanVien_id: nhanVienId,
                NgayHen: lichHen.NgayHen,
                TrangThai: 1
            }
        });

        if (trungLich) {
            return res.status(400).json({ message: "Nhân viên này đã có lịch vào thời gian đó" });
        }

        // Gán nhân viên và duyệt lịch
        lichHen.NhanVien_id = nhanVienId;
        lichHen.TrangThai = 1;

        await lichHen.save();

        return res.json({ message: "Duyệt lịch thành công", lichHen });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.huyLichHen = async (req, res) => {
    try {
        const { id } = req.params;

        const lichHen = await LichHen.findByPk(id);
        if (!lichHen) {
            return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        }

        // Nếu đã duyệt hoặc đang chờ thì mới cho hủy
        if (lichHen.TrangThai === 2) {
            return res.status(400).json({ message: "Lịch hẹn này đã bị hủy trước đó" });
        }

        lichHen.TrangThai = 2; // Hủy
        await lichHen.save();

        return res.json({ message: "Hủy lịch hẹn thành công", lichHen });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getAllLichHen = async (req, res) => {
    try {
        const lichHens = await LichHen.findAll();
        return res.json(lichHens);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getLichHenNhanVien = async (req, res) => {
    try {
        const { id } = req.params;
        const lichHens = await LichHen.findAll({
            where: { NhanVien_id: id, TrangThai: 1 }
        });
        return res.json(lichHens);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};