const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NhanVien = sequelize.define("NhanVien", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaNV: {
        type: DataTypes.STRING(10),
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
    NgayLamViec: {
        type: DataTypes.DATE,
    },
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "NhanVien",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["MaNV"] },
        { unique: true, fields: ["SoDienThoai"] },
        { unique: true, fields: ["email"] }
    ]
});

module.exports = NhanVien;
