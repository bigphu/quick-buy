// const db = require('../config/db');

// // Lấy dữ liệu giỏ hàng để hiển thị
// exports.getCartDetails = async (req, res) => {
//     try {
//         const { cartId } = req.params;
//         // JOIN các bảng để lấy thông tin chi tiết sản phẩm
//         // Lưu ý: Bảng Product của bạn KHÔNG có cột ảnh, nên ta sẽ xử lý ảnh ở Frontend
//         const [rows] = await db.execute(`
//             SELECT 
//                 ci.CartItemID, 
//                 ci.Quantity, 
//                 ci.ItemPrice,
//                 p.ProductID, 
//                 p.ProductName, 
//                 p.ProductPrice, 
//                 c.CategoryName 
//             FROM Cart_Item ci
//             JOIN Product p ON ci.ProductID = p.ProductID
//             LEFT JOIN Category c ON p.CategoryID = c.CategoryID
//             WHERE ci.CartID = ?
//         `, [cartId]);

//         res.status(200).json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Lỗi Server khi lấy giỏ hàng" });
//     }
// };

// // 1. INSERT (Gọi SP: sp_AddToCart)
// exports.addToCart = async (req, res) => {
//     try {
//         const { cartId, productId, quantity, storeId } = req.body;
//         // Gọi Stored Procedure
//         await db.execute('CALL sp_AddToCart(?, ?, ?, ?)', [
//             cartId, productId, quantity, storeId
//         ]);
//         res.status(200).json({ message: "Thêm vào giỏ hàng thành công!" });
//     } catch (error) {
//         // Trả về thông báo lỗi từ SIGNAL SQLSTATE trong SP (ví dụ: Hết hàng)
//         res.status(400).json({ message: error.sqlMessage || "Lỗi thêm sản phẩm" });
//     }
// };

// // 2. UPDATE (Gọi SP: sp_UpdateCartItem_BOPIS)
// exports.updateCartItem = async (req, res) => {
//     try {
//         const { cartItemId, newQuantity, storeId } = req.body;
//         await db.execute('CALL sp_UpdateCartItem_BOPIS(?, ?, ?)', [
//             cartItemId, newQuantity, storeId
//         ]);
//         res.status(200).json({ message: "Cập nhật giỏ hàng thành công!" });
//     } catch (error) {
//         res.status(400).json({ message: error.sqlMessage || "Lỗi cập nhật" });
//     }
// };

// // 3. DELETE (Gọi SP: sp_DeleteCartItem)
// exports.deleteCartItem = async (req, res) => {
//     try {
//         const { cartItemId } = req.params;
//         await db.execute('CALL sp_DeleteCartItem(?)', [cartItemId]);
//         res.status(200).json({ message: "Xóa sản phẩm thành công!" });
//     } catch (error) {
//         res.status(400).json({ message: error.sqlMessage || "Lỗi xóa sản phẩm" });
//     }
// };

// src/controllers/cartController.js
const db = require('../config/db');

// Lấy dữ liệu giỏ hàng để hiển thị
exports.getCartDetails = async (req, res) => {
    try {
        const { cartId } = req.params;

        // SỬA LẠI CÂU SQL:
        // 1. Join thêm bảng Belongs_To để lấy Category
        // 2. Bỏ p.Product_Image vì bảng Product không có cột này
        const [rows] = await db.execute(`
            SELECT 
                ci.CartItemID, 
                ci.Quantity, 
                ci.ItemPrice,
                p.ProductID, 
                p.ProductName, 
                p.ProductPrice, 
                c.CategoryName 
            FROM Cart_Item ci
            JOIN Product p ON ci.ProductID = p.ProductID
            LEFT JOIN Belongs_To bt ON p.ProductID = bt.ProductID
            LEFT JOIN Category c ON bt.CategoryID = c.CategoryID
            WHERE ci.CartID = ?
        `, [cartId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error); // In lỗi ra terminal để dễ debug
        res.status(500).json({ message: "Lỗi Server khi lấy giỏ hàng" });
    }
};

// 1. INSERT (Gọi SP: sp_AddToCart)
exports.addToCart = async (req, res) => {
    try {
        const { cartId, productId, quantity, storeId } = req.body;
        // Gọi Stored Procedure
        await db.execute('CALL sp_AddToCart(?, ?, ?, ?)', [
            cartId, productId, quantity, storeId
        ]);
        res.status(200).json({ message: "Thêm vào giỏ hàng thành công!" });
    } catch (error) {
        // Trả về thông báo lỗi từ SIGNAL SQLSTATE trong SP
        res.status(400).json({ message: error.sqlMessage || "Lỗi thêm sản phẩm" });
    }
};

// 2. UPDATE (Gọi SP: sp_UpdateCartItem_BOPIS)
exports.updateCartItem = async (req, res) => {
    try {
        const { cartItemId, newQuantity, storeId } = req.body;
        await db.execute('CALL sp_UpdateCartItem(?, ?, ?)', [
            cartItemId, newQuantity, storeId
        ]);
        res.status(200).json({ message: "Cập nhật giỏ hàng thành công!" });
    } catch (error) {
        if (error.sqlMessage === 'Error: Requested quantity exceeds current store stock.') {
            return res.status(400).json({ message: "Số lượng yêu cầu vượt quá tồn kho hiện tại." });
        }
        res.status(400).json({ message: error.sqlMessage || "Lỗi cập nhật" });
    }
};

// 3. DELETE (Gọi SP: sp_DeleteCartItem)
exports.deleteCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await db.execute('CALL sp_DeleteCartItem(?)', [cartItemId]);
        res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
        res.status(400).json({ message: error.sqlMessage || "Lỗi xóa sản phẩm" });
    }
};

// 4. VALIDATE COUPON
exports.getCoupon = async (req, res) => {
    try {
        const { storeId } = req.params;
        const [rows] = await db.execute(`SELECT
            Name, Description, DiscountValue, CouponAmount,
            MinimumPriceRequired, CreatedDate, ExpiryDate,
            StoreID, CustomerID, OrderID
        FROM Coupon
        WHERE StoreID = ?
            
            `, [storeId]);
        // Implement logic to validate coupon based on storeId
        // This is a placeholder response
        res.status(200).json(rows, { message: "Lấy coupon thành công!" });
    } catch (error) {
        res.status(400).json({ message: error.sqlMessage || "Lỗi fetch coupon" });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { cartId, storeId, paymentMethod } = req.body;
        // Gọi Stored Procedure để tạo đơn hàng
        await db.execute('CALL sp_CreateOrder(?, ?, ?)', [
            cartId, storeId, paymentMethod,
        ]);
        res.status(200).json({ message: "Tạo đơn hàng thành công!" });
    }
    catch (error) {
        res.status(400).json({ message: error.sqlMessage || "Lỗi tạo đơn hàng" });
    }
};