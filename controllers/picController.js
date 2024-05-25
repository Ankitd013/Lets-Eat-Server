const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure Multer's storage option
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Corrected directory name used in `dest`
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Permissible loading a single file,
// with the attribute "name" on the form set to "image".
var type = upload.single('image');

router.post('/', type, (req, res) => {
  // Since we use multer's diskStorage, the file is already saved to target_path.
  // No need for additional file copy operations, so just send a response back.
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.status(201).send('File uploaded successfully.');
});

module.exports = router;
