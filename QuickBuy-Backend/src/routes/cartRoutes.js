// src/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET: Lấy giỏ hàng
router.get('/:cartId', cartController.getCartDetails);

// POST: Thêm mới (Insert)
router.post('/add', cartController.addToCart);

// PUT: Cập nhật (Update)
router.put('/update', cartController.updateCartItem);

// DELETE: Xóa (Delete)
router.delete('/remove/:cartItemId', cartController.deleteCartItem);

module.exports = router;