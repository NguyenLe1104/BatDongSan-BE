const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LoaiNhaDat = sequelize.define("LoaiNhaDat", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaLoaiDat: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    TenLoaiDat: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: "LoaiNhaDat",
    timestamps: false,
    indexes: [
        { unique: true, fields: ["MaLoaiDat"] }
    ]
});

module.exports = LoaiNhaDat;
