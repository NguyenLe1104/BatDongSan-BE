const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    HoTen: {
        type: DataTypes.STRING,
    },
    SoDienThoai: {
        type: DataTypes.STRING(15),
        validate: {
            is: {
                args: /^0[0-9]{9,10}$/,
                msg: "Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10–11 chữ số."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true, // Đây là cú pháp để bật kiểm tra định dạng email
                msg: "Định dạng email không hợp lệ. Ví dụ nguyenvana@gmail.com" // Thông báo lỗi khi không hợp lệ
            }
        }
    },
    DiaChi: {
        type: DataTypes.STRING,

    },

    TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "Users",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["username"] },
        { unique: true, fields: ["SoDienThoai"] },
        { unique: true, fields: ["email"] }

    ],
});

module.exports = User;
