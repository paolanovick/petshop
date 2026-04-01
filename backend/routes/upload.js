const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', verifyAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se recibió ningún archivo' });
  }

  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${req.file.mimetype};base64,${base64}`;

  res.json({ url: dataUrl });
});

module.exports = router;
