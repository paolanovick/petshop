const express = require('express');
const router = express.Router();
const adController = require('../controllers/advertisementController');
const verifyAdmin = require('../middleware/verifyAdmin');

// Público
router.get('/active', adController.getActiveAd);

// Admin
router.get('/', verifyAdmin, adController.getAllAds);
router.post('/', verifyAdmin, adController.createAd);
router.put('/:id', verifyAdmin, adController.updateAd);
router.delete('/:id', verifyAdmin, adController.deleteAd);

module.exports = router;