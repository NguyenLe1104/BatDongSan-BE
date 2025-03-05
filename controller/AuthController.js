const User = require("../models/User");
const bcrypt = require("bcrypt");
const VaiTro = require("../models/VaiTro");
const UserVaiTro = require("../models/User_VaiTro");

exports.register = async (req, res) => {
    try {
        console.log("📌 Nhận request đăng ký:", req.body); // Debug

        const { username, password, HoTen, SoDienThoai, email, DiaChi } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username và Password không được bỏ trống" });
        }

        // Kiểm tra username, email, số điện thoại có tồn tại chưa
        const existUsername = await User.findOne({ where: { username } });
        if (existUsername) return res.status(400).json({ error: "Username đã tồn tại" });

        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) return res.status(400).json({ error: "Email đã tồn tại" });

        const existSoDienThoai = await User.findOne({ where: { SoDienThoai } });
        if (existSoDienThoai) return res.status(400).json({ error: "Số điện thoại đã tồn tại" });

        // Mã hóa mật khẩu
        const hashPass = await bcrypt.hash(password, 10);

        // Tạo user mới với quyền mặc định là KHÁCH HÀNG
        const newUser = await User.create({
            username,
            password: hashPass,
            HoTen,
            SoDienThoai,
            email,
            DiaChi,
            TrangThai: 1,
        });

        console.log("✅ Tạo user thành công:", newUser);

        // Gán vai trò mặc định là KHÁCH HÀNG
        const vaitroKH = await VaiTro.findOne({ where: { MaVaiTro: "KHACHHANG" } });
        if (!vaitroKH) {
            return res.status(500).json({ error: "Không tìm thấy vai trò KHÁCH HÀNG" });
        }

        await UserVaiTro.create({
            User_id: newUser.id,
            VaiTro_id: vaitroKH.id,
        });

        res.status(201).json({ message: "Đăng ký tài khoản thành công!", user: newUser });
    } catch (error) {
        console.error("❌ Lỗi khi đăng ký tài khoản:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};
