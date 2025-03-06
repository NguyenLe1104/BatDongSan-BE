const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Vui lòng đăng nhập!" });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Lỗi hệ thống: JWT_SECRET chưa được thiết lập!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token không hợp lệ!" });
    }
};

// Middleware kiểm tra quyền ADMIN
const isAdmin = (req, res, next) => {
    if (!req.user || !Array.isArray(req.user.roles) || !req.user.roles.includes("ADMIN")) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
