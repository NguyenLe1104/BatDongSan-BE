const User = require("../models/User");
const bcrypt = require("bcrypt");
const VaiTro = require("../models/VaiTro");
const UserVaiTro = require("../models/User_VaiTro");
exports.register = async (req, res) => {
    try {
        const { username, password, HoTen, SoDienThoai, email, DiaChi, TrangThai } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username và Password không được bỏ trống" });
        }
        //ktra useruser
        const existUsername = await User.findOne({
            where: { username }
        });
        if (existUsername) return res.status(400).json({ error: "Username đã tồn tại" });

        //ktra email
        const existEmail = await User.findOne({
            where: { email }
        });
        if (existEmail) return res.status(400).json({ error: "Email đã tồn tại" });

        //ktra sdt
        const existSoDienThoai = await User.findOne({
            where: { SoDienThoai }
        });
        if (existSoDienThoai) return res.status(400).json({ error: "Số điện thoại đã tồn tại" });
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashPass,
            HoTen,
            SoDienThoai,
            email,
            DiaChi,
            TrangThai: 1,
        });

        const vaitroKH = await VaiTro.findOne({ where: { MaVaiTro: "KHACHHANG" } });
        await UserVaiTro.create({
            User_id: newUser.id,
            VaiTro_id: vaitroKH.id,
        });

        res.status(201).json({ message: "Đăng ký tài khoản thành công!" });
    } catch (error) {
        console.error("Lỗi khi thêm tài khoản:", error);
        res.status(500).json({ error: error.message });
    }
};