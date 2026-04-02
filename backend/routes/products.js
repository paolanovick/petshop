const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyAdmin = require('../middleware/verifyAdmin');

// GET /api/products - Obtener todos los productos (con filtros opcionales)
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un producto
router.post('/', verifyAdmin, productController.createProduct);

// PUT /api/products/:id - Actualizar un producto
router.put('/:id', verifyAdmin, productController.updateProduct);

// DELETE /api/products/:id - Desactivar un producto (soft delete)
router.delete('/:id', verifyAdmin, productController.deleteProduct);

// PATCH /api/products/:id/stock - Actualizar stock
router.patch('/:id/stock', verifyAdmin, productController.updateStock);

module.exports = router;
