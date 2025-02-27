
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const User = require("../models/User");
exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Thiếu username hoặc password!" });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        const bcrypt = require("bcrypt");
        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            return res.status(400).json({ error: "Tài khoản hoặc mật khẩu không đúng!" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        res.json({ message: "Đăng nhập thành công!", token });
    } catch (error) {
        res.status(500).json({ error: "Lỗi đăng nhập" });
    }
};
