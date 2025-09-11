
const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user)
            return res.status(404).json({ error: "Không tìm thấy người dùng" });
        res.json(user);
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
        const { email, SoDienThoai, HoTen, DiaChi } = req.body;

        if (email && email !== user.email) {
            const existEmail = await User.findOne({ where: { email } });
            if (existEmail) return res.status(400).json({ error: "Email đã tồn tại" });
        }

        if (SoDienThoai && SoDienThoai !== user.SoDienThoai) {
            const existSoDienThoai = await User.findOne({ where: { SoDienThoai } });
            if (existSoDienThoai) return res.status(400).json({ error: "Số điện thoại đã tồn tại" });
        }

        await User.update(
            { email, SoDienThoai, HoTen, DiaChi },
            { where: { id: userId } }
        );

        const updatedUser = await User.findByPk(userId);
        res.status(200).json({ message: "Cập nhật profile thành công!" });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: error.errors[0].message });
        }
        res.status(500).json({ error: error.message });
    }
};