const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const RefreshToken = sequelize.define("RefreshToken", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    revoked: {
        type: DataTypes.BOOLEAN,
    }
}, {
    tableName: "RefreshToken",
    timestamps: true, // createdAt, updatedAt
});
module.exports = RefreshToken;
