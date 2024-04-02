const path = require("path");
const multer = require("multer");

const filestorage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: filestorage });

module.exports = upload;
