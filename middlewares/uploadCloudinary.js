const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'batdongsan',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: (req, file) => {
            // Tạo tên file ngẫu nhiên để tránh trùng tên
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `${uniqueSuffix}-${file.originalname}`;
        }
    },
});

const upload = multer({ storage });

module.exports = {
    uploadMultiple: upload.array('images', 10),  // upload nhiều ảnh (tối đa 10)
};
