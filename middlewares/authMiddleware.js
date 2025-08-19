const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({
                message: "Vui lòng đăng nhập!",
                code: "NO_TOKEN"
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Token không tồn tại!",
                code: "NO_TOKEN"
            });
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Kiểm tra payload bắt buộc
        if (!decoded.id) {
            return res.status(401).json({
                message: "Token không chứa thông tin người dùng hợp lệ!",
                code: "INVALID_PAYLOAD"
            });
        }

        // Gán thông tin user vào request
        req.user = {
            id: decoded.id,
            roles: decoded.roles || [] // đảm bảo roles luôn là mảng
        };

        next();
    } catch (error) {
        console.error("Lỗi xác thực token:", error);

        // Phân loại lỗi
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token đã hết hạn!",
                code: "TOKEN_EXPIRED"
            });
        }

        return res.status(401).json({
            message: "Token không hợp lệ!",
            code: "INVALID_TOKEN"
        });
    }
};

// Middleware kiểm tra quyền
const checkRole = (allowRoles) => (req, res, next) => {
    if (!req.user || !req.user.roles.some(role => allowRoles.includes(role))) {
        return res.status(403).json({
            message: "Bạn không có quyền truy cập!",
            code: "FORBIDDEN"
        });
    }
    next();
};

module.exports = { verifyToken, checkRole };
