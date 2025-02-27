const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HopDong = sequelize.define("HopDong", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    MaHopDong: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    NhaDat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    KhachHang_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    LoaiHopDong: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    NgayKyKet: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ThoiHan: {
        type: DataTypes.INTEGER
    },
    GiaTriHopDong: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    }
}, {
    tableName: "HopDong",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["MaHopDong"] }
    ]
});

module.exports = HopDong;
