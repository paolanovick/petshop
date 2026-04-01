const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const verifyAdmin = require('../middleware/verifyAdmin');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/', verifyAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se recibió ningún archivo' });
  }

  try {
    const b64 = req.file.buffer.toString('base64');
    const dataUrl = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'petshop',
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Error al subir imagen', error: err.message });
  }
});

module.exports = router;
