const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const DiaChi = sequelize.define("DiaChi", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    Duong: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SoNha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "DiaChi",
    timestamps: false,
});

module.exports = DiaChi;