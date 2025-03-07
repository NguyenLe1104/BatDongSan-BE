const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DiaChi = sequelize.define("DiaChi", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ThanhPho: DataTypes.STRING,
    Quan: DataTypes.STRING,
    Phuong: DataTypes.STRING,
    Duong: DataTypes.STRING,
    SoNha: DataTypes.STRING,
}, {
    tableName: "DiaChi",
    timestamps: false,
});

module.exports = DiaChi;
