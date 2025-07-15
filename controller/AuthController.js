const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const { sendEmail } = require('../config/mail');
const generateOTP = require('../utils/generateOTP');
const bcrypt = require('bcryptjs');
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Email chưa được đăng ký' });

        const otp = generateOTP();
        const expireAt = new Date(Date.now() + 5 * 60 * 1000); // 5p

        await PasswordReset.destroy({ where: { email, type: 'reset' } });
        await PasswordReset.create({ email, otp, expireAt, type: 'reset' });
        const html = `
      <p>Xin chào ${user.HoTen || user.username},</p>
      <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
      <p>Mã có hiệu lực trong 5 phút.</p>
    `;
        await sendEmail(email, 'Mã OTP đặt lại mật khẩu', html);
        return res.status(200).json({ message: 'Mã OTP đã được gửi đến email của bạn' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const record = await PasswordReset.findOne({ where: { email, otp, type: 'reset' } });
        if (!record) {
            return res.status(400).json({ message: 'OTP không chính xác hoặc đã hết hạn' });
        }
        if (record.expireAt < new Date()) {
            await PasswordReset.destroy({ where: { email, type: 'reset' } });
            return res.status(400).json({ message: 'OTP đã hết hạn' });
        }
        const user = await User.findOne({ where: { email } });
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        await PasswordReset.destroy({ where: { email, type: 'reset' } }); //xoa otp sau khi dung
        return res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi' });

    }
}

