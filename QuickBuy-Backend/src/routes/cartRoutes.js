const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Định nghĩa các đường dẫn con cho /api/cart
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCartItem);
router.delete('/delete/:id', cartController.deleteCartItem);
router.get('/:cartId', cartController.getCartDetails);

module.exports = router;