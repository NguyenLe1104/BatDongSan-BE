const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Vui lòng đăng nhập!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (error) {
        res.status(401).json({ message: "Token không hợp lệ!" });
    }
};

// Middleware kiểm tra quyền ADMIN
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.roles.includes("ADMIN")) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
