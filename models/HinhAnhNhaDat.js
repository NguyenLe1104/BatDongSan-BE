const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HinhAnhNhaDat = sequelize.define("HinhAnhNhaDat", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idNhaDat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "NhaDat",
            key: "id"
        },
        onDelete: 'CASCADE'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50)
    },
    position: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "HinhAnhNhaDat",
    timestamps: true
});

module.exports = HinhAnhNhaDat;
