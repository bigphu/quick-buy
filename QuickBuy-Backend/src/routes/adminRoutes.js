const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/:userId', adminController.tue);

module.exports = router;