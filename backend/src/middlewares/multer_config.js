const multer = require('multer');
const path = require('path');
const fs = require('fs');
// || path.join(__dirname, '../../../frontend/public/'
// Get the image upload path from environment variable or use a default path
const uploadPath = process.env.IMAGE_UPLOAD_PATH;

// Ensure the uploads directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).single('image');