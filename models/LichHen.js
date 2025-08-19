const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const LichHen = sequelize.define("LichHen", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NhaDat_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    KhachHang_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NhanVien_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    NgayHen: {
        type: DataTypes.DATE,
        allowNull: false
    },
    TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: "LichHen", timestamps: true });

module.exports = LichHen;
