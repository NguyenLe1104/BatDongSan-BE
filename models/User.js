const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255), // Thêm độ dài rõ ràng
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
    },
    email: {
        type: DataTypes.STRING,
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
