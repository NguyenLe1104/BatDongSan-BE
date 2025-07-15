const BaiViet = require("../models/BaiViet");
const User = require("../models/User");
const HinhAnhBaiViet = require("../models/HinhAnhBaiViet");
const taoBaiViet = async (req, res) => {
    try {
        const { tieuDe, noiDung, gia, diaChi } = req.body;

        const uploadedFiles = req.files;

        // Kiểm tra req.user.id
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Người dùng chưa được xác thực hoặc không có." });
        }

        // Tạo bài viết trước, trạng thái chờ duyệt
        const baiViet = await BaiViet.create({
            tieuDe,
            noiDung,
            gia,
            diaChi,
            TrangThai: 0,
            userId: req.user.id,
        });

        // Lưu thông tin ảnh vào bảng HinhAnhBaiViet nếu có files
        if (uploadedFiles && uploadedFiles.length > 0) {
            // Lấy URL trực tiếp từ uploadedFiles (đã được Cloudinary tải lên)
            const hinhAnhData = uploadedFiles.map((file, index) => ({
                url: file.path,
                baiVietId: baiViet.id,
                position: index + 1,
            }));

            // Lưu ảnh vào bảng HinhAnhBaiViet
            await HinhAnhBaiViet.bulkCreate(hinhAnhData);
        }

        // Lấy lại bài viết kèm ảnh để trả về client
        const baiVietFull = await BaiViet.findByPk(baiViet.id, {
            include: {
                model: HinhAnhBaiViet,
                as: "hinhAnh",
                attributes: ["id", "url", "position"],
            },
        });

        res.status(201).json({
            message: "Bài viết đã được gửi và đang chờ admin duyệt.",
            baiViet: baiVietFull,
        });

    } catch (error) {
        console.error("Lỗi tạo bài viết:", error);
        res.status(500).json({ message: "Lỗi khi tạo bài viết", error: error.message });
    }
};
const layBaiVietDaDuyet = async (req, res) => {
    try {
        const danhSach = await BaiViet.findAll({
            where: { TrangThai: 1 },
            include: [
                {
                    model: User,
                    as: "nguoiDang",
                    attributes: ["id", "username", "HoTen"]
                },
                {
                    model: HinhAnhBaiViet,
                    as: "hinhAnh",
                    attributes: ["id", "url", "position"],
                }
            ],
        });

        res.json(danhSach);
    } catch (error) {
        console.error("Lỗi lấy danh sách bài viết:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách bài viết" });
    }
};

const layBaiChoDuyet = async (req, res) => {
    try {
        const baiChoDuyet = await BaiViet.findAll({
            where: { TrangThai: 0 },
            include: [
                {
                    model: User,
                    as: "nguoiDang",
                    attributes: ["id", "username", "HoTen"]
                },
                {
                    model: HinhAnhBaiViet,
                    as: "hinhAnh",
                    attributes: ["id", "url", "position"],
                }
            ],
        });

        res.json(baiChoDuyet);
    } catch (error) {
        console.error("Lỗi lấy bài chờ duyệt:", error);
        res.status(500).json({ message: "Lỗi khi lấy bài chờ duyệt" });
    }
};
const duyetBaiViet = async (req, res) => {
    try {
        const { id } = req.params;

        const baiViet = await BaiViet.findByPk(id);
        if (!baiViet) return res.status(404).json({ message: "Không tìm thấy bài viết" });

        baiViet.TrangThai = 1; // duyệt
        await baiViet.save();

        res.json({ message: "Bài viết đã được duyệt thành công", baiViet });
    } catch (error) {
        console.error("Lỗi duyệt bài viết:", error);
        res.status(500).json({ message: "Lỗi khi duyệt bài viết" });
    }
};
const tuChoiBaiViet = async (req, res) => {
    try {
        const { id } = req.params;

        const baiViet = await BaiViet.findByPk(id);
        if (!baiViet) return res.status(404).json({ message: "Không tìm thấy bài viết" });

        baiViet.TrangThai = 2; // từ chối
        await baiViet.save();

        res.json({ message: "Bài viết đã bị từ chối", baiViet });
    } catch (error) {
        console.error("Lỗi từ chối bài viết:", error);
        res.status(500).json({ message: "Lỗi khi từ chối bài viết" });
    }
};
module.exports = {
    taoBaiViet,
    layBaiVietDaDuyet,
    layBaiChoDuyet,
    duyetBaiViet,
    tuChoiBaiViet,
};