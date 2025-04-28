const multer = require('multer');
const path = require('path');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// Filter function to allow only images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF image files are allowed'), false);
  }
};

// Set up upload with size limit from env (default 10MB)
const maxSize = process.env.MAX_FILE_SIZE || 10 * 1024 * 1024; // 10MB

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  },
  fileFilter: fileFilter
});

module.exports = upload;