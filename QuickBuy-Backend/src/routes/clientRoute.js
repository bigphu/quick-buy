const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// GET: Get customer profile
router.get('/:clientId/profile', clientController.getCustomerProfile);

// GET: Get client loyalty points
router.get('/:clientId/loyalty-points', clientController.getloyaltyPoints);

// GET: Get client order history
router.get('/:clientId/order-history', clientController.getorderHistory);

// PUT: Update client loyalty points
router.put('/:clientId/loyalty-points', clientController.updateLoyaltyPoints);

module.exports = router;