const multer = require("multer");
const path = require("path");

//multer instance
const upload = multer({
  limits: {
    fileSize: 800 * 1024 * 1024, // 800MB
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const extention = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + extention);
    },
  }),
});

module.exports = upload;