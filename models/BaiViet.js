const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BaiViet = sequelize.define("BaiViet", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    TieuDe: {   // ✅ Thêm trường Tiêu đề
        type: DataTypes.STRING,
        allowNull: false,
    },
    ThanhPho: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Quan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Phuong: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DiaChi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MoTa: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    GiaBan: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    DienTich: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Huong: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ngayDang: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    ngayDuyet: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'BaiViet',
    timestamps: true,
});

module.exports = BaiViet;
