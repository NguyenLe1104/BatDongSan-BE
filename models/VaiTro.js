const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VaiTro = sequelize.define("VaiTro", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MaVaiTro: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    TenRole: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MoTa: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "VaiTro",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["MaVaiTro"]
        }
    ]
});
module.exports = VaiTro;