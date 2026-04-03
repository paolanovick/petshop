const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoryController');
const verifyAdmin = require('../middleware/verifyAdmin');

// Públicas
router.get('/', ctrl.getPublicCategories);

// Admin
router.get('/admin', verifyAdmin, ctrl.getAllCategories);
router.post('/', verifyAdmin, ctrl.createCategory);
router.put('/:id', verifyAdmin, ctrl.updateCategory);
router.delete('/:id', verifyAdmin, ctrl.deleteCategory);
router.patch('/reorder', verifyAdmin, ctrl.reorderCategories);

module.exports = router;
