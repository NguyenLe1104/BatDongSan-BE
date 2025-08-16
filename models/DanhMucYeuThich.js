// models/DanhMucYeuThich.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DanhMucYeuThich = sequelize.define("DanhMucYeuThich", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    NhaDatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "DanhMucYeuThich",
    timestamps: false, // nếu không cần updatedAt
    indexes: [
        { unique: true, fields: ["UserId", "NhaDatId"] }
    ]
});

module.exports = DanhMucYeuThich;
