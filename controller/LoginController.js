require("dotenv").config();
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const User = require("../models/User");
const VaiTro = require("../models/VaiTro");
const UserVaiTro = require("../models/User_VaiTro");
const NhanVien = require("../models/NhanVien");

const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Thiếu username hoặc password!" });
        }

        // Kiểm tra user có tồn tại không
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        // Lấy danh sách vai trò của user
        const userRoles = await UserVaiTro.findAll({
            where: { User_id: user.id },
            include: [{ model: VaiTro, attributes: ["MaVaiTro"] }],
        });

        // Chuyển danh sách vai trò thành mảng
        const roles = userRoles.map(ur => ur.VaiTro.MaVaiTro);

        let nhanVienId = null;
        if (roles.includes("NHANVIEN")) {
            const nhanVien = await NhanVien.findOne({ where: { User_id: user.id } });
            if (nhanVien) nhanVienId = nhanVien.id;
        }

        // Tạo JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, roles },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.json({
            message: "Đăng nhập thành công!",
            token,
            roles,
            userId: user.id,
            nhanVienId // sẽ trả null nếu không phải nhân viên
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ error: "Lỗi đăng nhập" });
    }
};
