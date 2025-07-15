const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const PasswordReset = sequelize.define("PasswordReset", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['register', 'reset']]
        }
    }
}, {
    tableName: 'PasswordReset',
    timestamps: true,
});
module.exports = PasswordReset;