const User = require("../models/User");
const KhachHang = require("../models/KhachHang");
const NhanVien = require("../models/NhanVien");
const NhaDat = require("../models/NhaDat");
const VaiTro = require("../models/VaiTro");
const DiaChi = require("../models/DiaChi");
const LoaiNhaDat = require("../models/LoaiNhaDat");
const UserVaiTro = require("../models/User_VaiTro");
const ThongTinDatBan = require("../models/ThongTinDatBan");
const HopDong = require("../models/HopDong");
const LichHen = require("../models/LichHen");

// Quan hệ 1-1: User - KhachHang
User.hasOne(KhachHang, { foreignKey: "User_id" });
KhachHang.belongsTo(User, { foreignKey: "User_id" });

// Quan hệ 1-1: User - NhanVien
User.hasOne(NhanVien, { foreignKey: "User_id" });
NhanVien.belongsTo(User, { foreignKey: "User_id" });

// Quan hệ 1-n: NhaDat - LoaiNhaDat
NhaDat.belongsTo(LoaiNhaDat, { foreignKey: "LoaiNhaDat_id" });
LoaiNhaDat.hasMany(NhaDat, { foreignKey: "LoaiNhaDat_id" });

// Quan hệ 1-n: NhaDat - DiaChi
NhaDat.belongsTo(DiaChi, { foreignKey: "DiaChi_id" });
DiaChi.hasMany(NhaDat, { foreignKey: "DiaChi_id" });
// Quan hệ 1-n: ThongTinDatBan - User
ThongTinDatBan.belongsTo(User, { foreignKey: "User_id" });
User.hasMany(ThongTinDatBan, { foreignKey: "User_id" });

// Quan hệ 1-n: HopDong - NhaDat
HopDong.belongsTo(NhaDat, { foreignKey: "NhaDat_id" });
NhaDat.hasMany(HopDong, { foreignKey: "NhaDat_id" });

// Quan hệ 1-n: HopDong - KhachHang
HopDong.belongsTo(KhachHang, { foreignKey: "KhachHang_id" });
KhachHang.hasMany(HopDong, { foreignKey: "KhachHang_id" });

// Quan hệ 1-n: LichHen - NhaDat
LichHen.belongsTo(NhaDat, { foreignKey: "NhaDat_id" });
NhaDat.hasMany(LichHen, { foreignKey: "NhaDat_id" });

// Quan hệ 1-n: LichHen - KhachHang
LichHen.belongsTo(KhachHang, { foreignKey: "KhachHang_id" });
KhachHang.hasMany(LichHen, { foreignKey: "KhachHang_id" });

// Quan hệ 1-n: LichHen - NhanVien
LichHen.belongsTo(NhanVien, { foreignKey: "NhanVien_id" });
NhanVien.hasMany(LichHen, { foreignKey: "NhanVien_id" });
// Quan hệ n-n: User - VaiTro (thông qua bảng trung gian UserVaiTro)
User.belongsToMany(VaiTro, { through: UserVaiTro, foreignKey: "User_id" });
VaiTro.belongsToMany(User, { through: UserVaiTro, foreignKey: "VaiTro_id" });

UserVaiTro.belongsTo(User, { foreignKey: "User_id" });
UserVaiTro.belongsTo(VaiTro, { foreignKey: "VaiTro_id" });

module.exports = {
    User, KhachHang, NhanVien, NhaDat, VaiTro, DiaChi, LoaiNhaDat,
    UserVaiTro, ThongTinDatBan, HopDong, LichHen
};