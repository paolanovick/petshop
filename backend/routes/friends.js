const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const verifyAdmin = require('../middleware/verifyAdmin');

// Público
router.get('/', friendController.getAllFriends);

// Admin
router.get('/admin', verifyAdmin, friendController.getAllFriendsAdmin);
router.post('/', verifyAdmin, friendController.createFriend);
router.put('/:id', verifyAdmin, friendController.updateFriend);
router.delete('/:id', verifyAdmin, friendController.deleteFriend);

module.exports = router;