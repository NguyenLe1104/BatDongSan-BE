const User = require("../models/User");
const KhachHang = require("../models/KhachHang");
const NhanVien = require("../models/NhanVien");
const NhaDat = require("../models/NhaDat");
const VaiTro = require("../models/VaiTro");
const LoaiNhaDat = require("../models/LoaiNhaDat");
const UserVaiTro = require("../models/User_VaiTro");
const LichHen = require("../models/LichHen");
const HinhAnhNhaDat = require("../models/HinhAnhNhaDat");
const BaiViet = require("../models/BaiViet");
const HinhAnhBaiViet = require("../models/HinhAnhBaiViet");
const Danhmucyeuthich = require("../models/DanhMucYeuThich");
const RefreshToken = require("../models/RefreshToken");
// Quan hệ 1-1: User - KhachHang
User.hasOne(KhachHang, { foreignKey: "User_id" });
KhachHang.belongsTo(User, { foreignKey: "User_id" });

// Quan hệ 1-1: User - NhanVien
User.hasOne(NhanVien, { foreignKey: "User_id" });
NhanVien.belongsTo(User, { foreignKey: "User_id" });

// Quan hệ 1-n: NhaDat - LoaiNhaDat
NhaDat.belongsTo(LoaiNhaDat, { foreignKey: "LoaiNhaDat_id" });
LoaiNhaDat.hasMany(NhaDat, { foreignKey: "LoaiNhaDat_id" });


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

NhaDat.hasMany(HinhAnhNhaDat, { foreignKey: 'idNhaDat', as: 'hinhAnh' });
HinhAnhNhaDat.belongsTo(NhaDat, { foreignKey: 'idNhaDat' });
// Quan hệ 1-n: User - BaiViet
User.hasMany(BaiViet, { foreignKey: "userId", as: "baiViet" });
BaiViet.belongsTo(User, { foreignKey: "userId", as: "nguoiDang" });
// Quan hệ 1-n: BaiViet - HinhAnhBaiViet
BaiViet.hasMany(HinhAnhBaiViet, { foreignKey: "baiVietId", as: "hinhAnh" });
HinhAnhBaiViet.belongsTo(BaiViet, { foreignKey: "baiVietId" });

// Quan hệ 1-n: User - DanhMucYeuThich
User.hasMany(Danhmucyeuthich, { foreignKey: "UserId", as: "danhMucYeuThich" });
Danhmucyeuthich.belongsTo(User, { foreignKey: "UserId", as: "nguoiYeuThich" });

// Quan hệ 1-n: NhaDat - DanhMucYeuThich
NhaDat.hasMany(Danhmucyeuthich, { foreignKey: "NhaDatId", as: "danhMucYeuThich" });
Danhmucyeuthich.belongsTo(NhaDat, { foreignKey: "NhaDatId", as: "nhaDatYeuThich" });

// Quan hệ 1 User có nhiều RefreshToken
User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// Quan hệ 1-n: NhanVien - NhaDat
NhanVien.hasMany(NhaDat, { foreignKey: "NhanVien_id" });
NhaDat.belongsTo(NhanVien, { foreignKey: "NhanVien_id" });
module.exports = {
    User, KhachHang, NhanVien, NhaDat, VaiTro, LoaiNhaDat,
    UserVaiTro, LichHen,
    BaiViet, HinhAnhBaiViet,
    HinhAnhNhaDat,
    Danhmucyeuthich
};