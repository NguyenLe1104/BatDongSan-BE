const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ThongTinDatBan = sequelize.define("ThongTinDatBan", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    TenChuSoHuu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SoDienThoai: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    TenNhaDat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LoaiNhaDat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    DiaChi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    MoTa: {
        type: DataTypes.STRING,
    },
    GiaBan: {
        type: DataTypes.DECIMAL,
    },
    DienTich: {
        type: DataTypes.FLOAT,
    },
    Huong: {
        type: DataTypes.STRING,
    },
    HinhAnh: {
        type: DataTypes.STRING,
    },
    TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "ThongTinDatBan",
    timestamps: true,
});

module.exports = ThongTinDatBan;
