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
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "KhachHang",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["MaKH"] }
    ]
});

module.exports = KhachHang;
