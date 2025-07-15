const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HinhAnhBaiViet = sequelize.define("HinhAnhBaiViet", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    baiVietId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "BaiViet",
            key: "id"
        },
        onDelete: "CASCADE",
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: "HinhAnhBaiViet",
    timestamps: true,
});

module.exports = HinhAnhBaiViet;
