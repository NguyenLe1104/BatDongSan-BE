const LoaiNhaDat = require("../models/LoaiNhaDat");
const NhaDat = require("../models/NhaDat");
const HinhAnhNhaDat = require("../models/HinhAnhNhaDat")
const { Op } = require("sequelize");
exports.getAllNhaDat = async (req, res) => {
    try {
        const nhaDat = await NhaDat.findAll({
            include: [
                {
                    model: LoaiNhaDat,
                    attributes: ['id', 'TenLoaiDat']
                },
                {
                    model: HinhAnhNhaDat,
                    as: 'hinhAnh',
                    attributes: ['url']

                }
            ]
        });
        res.json(nhaDat);
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ error: "Lỗi khi lấy danh sách nhà đất" });
    }
};


exports.getNhaDatById = async (req, res) => {
    try {
        const { id } = req.params;
        const nhaDat = await NhaDat.findByPk(id,
            {
                include: [
                    {
                        model: LoaiNhaDat,
                        attributes: ['id', 'TenLoaiDat']
                    },
                    {
                        model: HinhAnhNhaDat,
                        as: 'hinhAnh',
                        attributes: ['url']
                    }
                ]
            }
        );

        if (!nhaDat) return res.status(404).json({ error: "Không tìm thấy nhà đất" });

        res.json(nhaDat);
    } catch (error) {
        console.error("Lỗi khi lấy nhà đất theo ID:", error);
        res.status(500).json({ error: "Lỗi khi lấy nhà đất" });
    }
};

exports.addNhaDat = async (req, res) => {
    try {
        const {
            MaNhaDat,
            TenNhaDat,
            ThanhPho,
            Quan,
            Phuong,
            Duong,
            SoNha,
            MoTa,
            GiaBan,
            DienTich,
            Huong,
            LoaiNhaDat_id
        } = req.body;

        if (!MaNhaDat || !TenNhaDat) {
            return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
        }

        const existingNhaDat = await NhaDat.findOne({ where: { MaNhaDat } });
        if (existingNhaDat) {
            return res.status(400).json({ error: "Mã nhà đất đã tồn tại" });
        }

        // Tạo nhà đất mới
        const newNhaDat = await NhaDat.create({
            MaNhaDat,
            TenNhaDat,
            ThanhPho,
            Quan,
            Phuong,
            Duong,
            SoNha,
            MoTa,
            GiaBan,
            DienTich,
            Huong,
            TrangThai: 1,
            LoaiNhaDat_id
        });

        // Lưu ảnh vào bảng HinhAnhNhaDat
        if (req.files && req.files.length > 0) {
            const hinhAnhData = req.files.map((file) => ({
                url: file.path,
                idNhaDat: newNhaDat.id,
            }));

            await HinhAnhNhaDat.bulkCreate(hinhAnhData);
        }

        res.status(201).json({ message: "Thêm nhà đất thành công!", data: newNhaDat });
    } catch (error) {
        console.error("Lỗi khi thêm nhà đất:", error);
        return res.status(500).json({ error: "Lỗi máy chủ" });
    }
};


exports.updateNhaDat = async (req, res) => {
    try {
        const { id } = req.params;
        const { MaNhaDat, ...updateData } = req.body;

        const nhaDat = await NhaDat.findByPk(id);
        if (!nhaDat) return res.status(404).json({ error: "Không tìm thấy nhà đất" });

        // Kiểm tra nếu MaNhaDat mới bị trùng với một nhà đất khác
        if (MaNhaDat) {
            const existingNhaDat = await NhaDat.findOne({ where: { MaNhaDat } });
            if (existingNhaDat && existingNhaDat.id !== Number(id)) {
                return res.status(400).json({ error: "Mã nhà đất đã tồn tại" });
            }
        }
        if (req.files && req.files.length > 0) {
            // Xoá ảnh cũ
            await HinhAnhNhaDat.destroy({ where: { idNhaDat: id } });

            const newHinhAnh = req.files.map(file => ({
                url: file.path, // hoặc file.url tùy config cloudinary
                idNhaDat: id,
            }));

            await HinhAnhNhaDat.bulkCreate(newHinhAnh);
        }



        await nhaDat.update(updateData);

        res.status(200).json({ message: "Cập nhật thành công!", data: nhaDat });
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

        await nhaDat.destroy();

        return res.status(200).json({ message: "Xóa nhà đất thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa nhà đất:", error);
        return res.status(500).json({ error: "Lỗi máy chủ" });
    }
};


exports.searchNhaDat = async (req, res) => {
    try {
        const {
            TenNhaDat,
            TenLoaiDat,
            ThanhPho,
            Quan,
            Phuong,
            Duong,
            GiaMin,
            GiaMax,
            DienTichMin,
            DienTichMax
        } = req.query;

        let whereClause = {};

        // Kiểm tra giá trị trước khi thêm vào điều kiện tìm kiếm
        if (TenNhaDat) whereClause.TenNhaDat = { [Op.like]: `%${TenNhaDat}%` };
        if (ThanhPho) whereClause.ThanhPho = ThanhPho;
        if (Quan) whereClause.Quan = Quan;
        if (Phuong) whereClause.Phuong = Phuong;
        if (Duong) whereClause.Duong = Duong;

        // Xử lý khoảng giá
        const giaMinNum = parseFloat(GiaMin);
        const giaMaxNum = parseFloat(GiaMax);
        if (!isNaN(giaMinNum) || !isNaN(giaMaxNum)) {
            whereClause.GiaBan = {};
            if (!isNaN(giaMinNum)) whereClause.GiaBan[Op.gte] = giaMinNum;
            if (!isNaN(giaMaxNum)) whereClause.GiaBan[Op.lte] = giaMaxNum;
        }

        // Xử lý khoảng diện tích
        const dienTichMinNum = parseFloat(DienTichMin);
        const dienTichMaxNum = parseFloat(DienTichMax);
        if (!isNaN(dienTichMinNum) || !isNaN(dienTichMaxNum)) {
            whereClause.DienTich = {};
            if (!isNaN(dienTichMinNum)) whereClause.DienTich[Op.gte] = dienTichMinNum;
            if (!isNaN(dienTichMaxNum)) whereClause.DienTich[Op.lte] = dienTichMaxNum;
        }

        // Tìm kiếm LoaiNhaDat
        let loaiNhaDatClause = {};
        if (TenLoaiDat) loaiNhaDatClause.TenLoaiDat = { [Op.like]: `%${TenLoaiDat}%` };

        const nhaDat = await NhaDat.findAll({
            where: whereClause,
            include: [
                {
                    model: LoaiNhaDat,
                    attributes: ["id", "TenLoaiDat"],
                    where: Object.keys(loaiNhaDatClause).length ? loaiNhaDatClause : undefined
                },
                {
                    model: HinhAnhNhaDat,
                    as: 'hinhAnh',
                    attributes: ['url']

                }
            ]
        });

        res.json(nhaDat);
    } catch (error) {
        console.error("Lỗi khi tìm kiếm nhà đất:", error);
        res.status(500).json({ error: "Lỗi khi tìm kiếm nhà đất" });
    }
};
