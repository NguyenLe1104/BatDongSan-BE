const User = require("../models/User");
const bcrypt = require("bcrypt");
const VaiTro = require("../models/VaiTro");
const UserVaiTro = require("../models/User_VaiTro");
const generateOTP = require("../utils/generateOTP");
const PasswordReset = require("../models/PasswordReset");
const { sendEmail } = require("../config/mail");
exports.register = async (req, res) => {
    try {
        const { username, password, HoTen, SoDienThoai, email, DiaChi } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Tên tài khoản và mật khẩu không được bỏ trống" });
        }
        //ktra useruser
        const existUsername = await User.findOne({
            where: { username }
        });
        if (existUsername) return res.status(400).json({ error: "Tên tài khoản đã tồn tại. Vui lòng nhập tên khác!" });

        //ktra email
        const existEmail = await User.findOne({
            where: { email }
        });
        if (existEmail) return res.status(400).json({ error: "Email đã đã được đăng ký!" });

        //ktra sdt
        const existSoDienThoai = await User.findOne({
            where: { SoDienThoai }
        });
        if (existSoDienThoai) return res.status(400).json({ error: "Số điện thoại đã được đăng ký" });
        const otp = generateOTP();
        const expireAt = new Date(Date.now() + 5 * 60 * 1000); // 5p

        await PasswordReset.destroy({ where: { email, type: 'register' } });
        await PasswordReset.create({ email, otp, expireAt, type: 'register' });

        const html = `
      <p>Xin chào ${HoTen || username},</p>
      <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
      <p>Mã có hiệu lực trong 5 phút.</p>
    `;
        await sendEmail(email, 'Mã xác thực đăng ký tài khoản', html);

        res.status(200).json({
            message: "Mã OTP đã được gửi đến email. Vui lòng xác thực để hoàn tất đăng ký.",
            tempData: { username, password, HoTen, SoDienThoai, email, DiaChi }
        });

    } catch (error) {
        console.error("Lỗi khi thêm tài khoản:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.confirmRegister = async (req, res) => {
    try {
        const { username, password, HoTen, SoDienThoai, email, DiaChi, otp } = req.body;

        const record = await PasswordReset.findOne({ where: { email, otp, type: 'register' } });

        if (!record) {
            return res.status(400).json({ message: 'OTP không đúng hoặc đã hết hạn' });
        }

        if (record.expireAt < new Date()) {
            await PasswordReset.destroy({ where: { email, type: 'register' } });
            return res.status(400).json({ message: 'OTP đã hết hạn' });
        }

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

        await PasswordReset.destroy({ where: { email, type: 'register' } });

        return res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("Lỗi xác nhận đăng ký:", error);
        res.status(500).json({ message: error.message });
    }

}