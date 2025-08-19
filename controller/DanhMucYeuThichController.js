const DanhMucYeuThich = require("../models/DanhMucYeuThich");
const NhaDat = require("../models/NhaDat");

// Lấy danh sách yêu thích của user
exports.list = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "Không tìm thấy ID người dùng từ token" });
    }

    const favorites = await DanhMucYeuThich.findAll({
      where: { UserId: userId }, // đồng bộ với DB
      include: [
        {
          model: NhaDat,
          as: "NhaDat" // alias khớp với associations trong models/quanhe.js
        }
      ]
    });

    res.json(favorites);
  } catch (err) {
    console.error("Lỗi khi lấy danh mục yêu thích:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Thêm vào danh sách yêu thích
exports.add = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { NhaDatId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Không tìm thấy ID người dùng" });
    }

    if (!NhaDatId) {
      return res.status(400).json({ message: "Thiếu NhaDatId" });
    }

    // Kiểm tra nhà đất có tồn tại không
    const nhaDat = await NhaDat.findByPk(NhaDatId);
    if (!nhaDat) {
      return res.status(404).json({ message: "Không tìm thấy nhà đất với ID này" });
    }

    // Kiểm tra đã tồn tại chưa
    const exists = await DanhMucYeuThich.findOne({
      where: { UserId: userId, NhaDatId }
    });
    if (exists) {
      return res.status(400).json({ message: "Bất động sản đã tồn tại trong danh sách yêu thích" });
    }

    // Tạo mới
    const newItem = await DanhMucYeuThich.create({ UserId: userId, NhaDatId });
    res.status(201).json({ message: "Đã thêm vào danh sách yêu thích", data: newItem });
  } catch (error) {
    console.error("Lỗi khi thêm danh mục yêu thích:", error);
    res.status(500).json({ message: "Không thể thêm vào danh mục yêu thích", error: error.message });
  }
};

// Xóa khỏi danh sách yêu thích
exports.remove = async (req, res) => {
  try {
    const userId = req.user?.id;
    const nhaDatId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Không tìm thấy ID người dùng" });
    }

    const deleted = await DanhMucYeuThich.destroy({
      where: { UserId: userId, NhaDatId: nhaDatId }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy mục yêu thích để xóa" });
    }

    res.json({ message: "Đã xóa khỏi danh sách yêu thích", NhaDatId: nhaDatId });
  } catch (error) {
    console.error("Lỗi khi xóa danh mục yêu thích:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
