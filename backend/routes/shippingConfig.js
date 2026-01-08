const express = require('express');
const router = express.Router();
const { getShippingConfig, updateShippingConfig } = require('../controllers/shippingConfigController');
const { protect } = require('../middleware/authMiddleware');

// Pública - para que los clientes lean
router.get('/', getShippingConfig);

// Protegida - solo admin puede actualizar
router.put('/', protect, updateShippingConfig);

module.exports = router;