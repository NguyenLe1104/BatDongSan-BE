const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'batdongsan',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        public_id: (req, file) => {
            // Tạo tên file ngẫu nhiên để tránh trùng tên
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `${uniqueSuffix}-${file.originalname}`;
        }
    },
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 // tối đa 10 files
    },
    fileFilter: (req, file, cb) => {
        // Kiểm tra định dạng file
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Chỉ chấp nhận file ảnh: jpg, jpeg, png, webp! File hiện tại: ${file.mimetype}`), false);
        }
    }
});

// Middleware xử lý lỗi upload
const uploadMultipleWithErrorHandling = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File quá lớn! Tối đa 5MB.' });
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ message: 'Quá nhiều file! Tối đa 10 file.' });
            }
            return res.status(400).json({ message: 'Lỗi upload file: ' + err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

module.exports = {
    uploadMultiple: uploadMultipleWithErrorHandling,
};
