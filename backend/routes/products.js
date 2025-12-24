const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Obtener todos los productos (con filtros opcionales)
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un producto
router.post('/', productController.createProduct);

// PUT /api/products/:id - Actualizar un producto
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Desactivar un producto (soft delete)
router.delete('/:id', productController.deleteProduct);

// PATCH /api/products/:id/stock - Actualizar stock
router.patch('/:id/stock', productController.updateStock);

module.exports = router;