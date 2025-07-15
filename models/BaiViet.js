const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BaiViet = sequelize.define("BaiViet", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tieuDe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    noiDung: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    gia: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    diaChi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ngayDang: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // mặc định lấy ngày tạo
    },
    ngayDuyet: {
        type: DataTypes.DATE,
        allowNull: true, // vì chưa duyệt thì để null
    }
}, {
    tableName: 'BaiViet',
    timestamps: true,
});
module.exports = BaiViet;