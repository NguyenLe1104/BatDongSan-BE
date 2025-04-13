const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const KhachHang = sequelize.define("KhachHang", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaKH: {
        type: DataTypes.STRING(5),
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
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "KhachHang",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["MaKH"] },
        { unique: true, fields: ["SoDienThoai"] },
        { unique: true, fields: ["email"] }
    ]
});

module.exports = KhachHang;
