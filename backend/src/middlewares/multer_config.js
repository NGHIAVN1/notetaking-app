const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"/Users/nghiadvh/Project/mern-notetaking-app/frontend/public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
  module.exports = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).single('image');