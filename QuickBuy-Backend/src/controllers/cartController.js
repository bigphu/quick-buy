const db = require('../config/db');

// Xử lý Add to Cart
exports.addToCart = async (req, res) => {
    const { cartId, productId, quantity, storeId } = req.body;
    try {
        const sql = 'CALL sp_AddToCart(?, ?, ?, ?)';
        const [rows] = await db.query(sql, [cartId, productId, quantity, storeId]);
        res.status(200).json({ message: rows[0][0].Message });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xử lý Update Cart
exports.updateCartItem = async (req, res) => {
    const { cartItemId, newQuantity, storeId } = req.body;
    try {
        const sql = 'CALL sp_UpdateCartItem_BOPIS(?, ?, ?)';
        const [rows] = await db.query(sql, [cartItemId, newQuantity, storeId]);
        res.status(200).json({ message: rows[0][0].Message });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xử lý Delete Cart Item
exports.deleteCartItem = async (req, res) => {
    const cartItemId = req.params.id;
    try {
        const sql = 'CALL sp_DeleteCartItem(?)';
        const [rows] = await db.query(sql, [cartItemId]);
        res.status(200).json({ message: rows[0][0].Message });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lấy danh sách giỏ hàng
exports.getCartDetails = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const sql = `
            SELECT ci.Cart_item_ID, p.ProductName, ci.Quantity, ci.Item_price, 
            (ci.Quantity * ci.Item_price) as Subtotal 
            FROM Cart_item ci
            JOIN Product p ON ci.Product_ID = p.Product_ID
            WHERE ci.Cart_ID = ?
        `;
        const [rows] = await db.query(sql, [cartId]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};