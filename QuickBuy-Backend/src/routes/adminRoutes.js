const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/user/:userId', adminController.tue);
router.get('/product/:productId', adminController.tue2);
router.get('/customers', adminController.getAllCustomers);
router.get('/stores', adminController.getAllStores);
module.exports = router;