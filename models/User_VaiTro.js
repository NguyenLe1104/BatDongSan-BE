const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserVaiTro = sequelize.define("UserVaiTro", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    VaiTro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
    }
}, {
    tableName: "UserVaiTro",
    timestamps: false,
});

module.exports = UserVaiTro;
