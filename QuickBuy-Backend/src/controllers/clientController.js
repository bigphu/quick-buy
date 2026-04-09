const db = require('../config/db');

exports.getCustomerProfile = async (req, res) => {
    try {
        const { clientId } = req.params;
        const [rows] = await db.execute(`
            SELECT CustomerID, FirstName, LastName, Email, PhoneNumber, 
                   Street, City, Country
            FROM Customer
            WHERE CustomerID = ?
        `, [clientId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Use the same function as admin page for consistency
        const [pointsResult] = await db.execute('SELECT fn_calculate_loyaltypoints(?) as points', [clientId]);
        rows[0].LoyaltyPoints = pointsResult[0].points;

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getloyaltyPoints = async (req, res) => {
    try {
        const { clientId } = req.params;
        const [rows] = await db.execute(`
            SELECT LoyaltyPoints
            FROM customer
            WHERE customerID = ?
        `, [clientId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Client not found" });
        }
        const loyaltyPoints = rows[0].LoyaltyPoints;
        res.json({ loyaltyPoints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getorderHistory = async (req, res) => {
    try {
        const { clientId } = req.params;
        const [rows] = await db.execute(`   
            SELECT 
                o.OrderID, o.OrderDate, o.TotalPrice, o.Status, o.StoreID,
                oi.OrderedItemID, oi.ProductID, oi.Quantity, oi.ItemPrice,
                p.ProductName, p.PictureUrl
            FROM \`Order\` o
            LEFT JOIN Ordered_Item oi ON o.OrderID = oi.OrderID
            LEFT JOIN Product p ON oi.ProductID = p.ProductID
            WHERE o.customerID = ?    
            ORDER BY o.OrderDate DESC, oi.OrderedItemID ASC
        `, [clientId]);

        const orderMap = new Map();

        for (const row of rows) {
            if (!orderMap.has(row.OrderID)) {
                orderMap.set(row.OrderID, {
                    OrderID: row.OrderID,
                    OrderDate: row.OrderDate,
                    TotalPrice: row.TotalPrice,
                    Status: row.Status,
                    StoreID: row.StoreID,
                    items: []
                });
            }

            if (row.OrderedItemID) {
                orderMap.get(row.OrderID).items.push({
                    OrderedItemID: row.OrderedItemID,
                    ProductID: row.ProductID,
                    ProductName: row.ProductName,
                    PictureUrl: row.PictureUrl,
                    Quantity: row.Quantity,
                    ItemPrice: row.ItemPrice
                });
            }
        }

        res.json({ orders: Array.from(orderMap.values()) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.reorder = async (req, res) => {
    try {
        const { clientId, orderId } = req.params;

        const [orderRows] = await db.execute(`
            SELECT OrderID, StoreID
            FROM \`Order\`
            WHERE OrderID = ? AND CustomerID = ?
            LIMIT 1
        `, [orderId, clientId]);

        if (orderRows.length === 0) {
            return res.status(404).json({ message: "Order not found for this customer." });
        }

        const [cartRows] = await db.execute(`
            SELECT CartID
            FROM Shopping_Cart
            WHERE CustomerID = ?
            LIMIT 1
        `, [clientId]);

        if (cartRows.length === 0) {
            return res.status(404).json({ message: "Cart not found for this customer." });
        }

        const [itemRows] = await db.execute(`
            SELECT ProductID, Quantity
            FROM Ordered_Item
            WHERE OrderID = ?
        `, [orderId]);

        if (itemRows.length === 0) {
            return res.status(400).json({ message: "Order has no items to reorder." });
        }

        const cartId = cartRows[0].CartID;
        const storeId = orderRows[0].StoreID;
        let addedCount = 0;
        const failures = [];

        for (const item of itemRows) {
            try {
                await db.execute('CALL sp_AddToCart(?, ?, ?, ?)', [
                    cartId,
                    item.ProductID,
                    item.Quantity,
                    storeId
                ]);
                addedCount += 1;
            } catch (error) {
                failures.push({
                    productId: item.ProductID,
                    message: error.sqlMessage || 'Failed to add item'
                });
            }
        }

        return res.json({
            success: failures.length === 0,
            message: failures.length === 0 ? 'Reorder completed.' : 'Reorder partially completed.',
            addedCount,
            failedCount: failures.length,
            failures
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateLoyaltyPoints = async (req, res) => {
    try {
        const { clientId } = req.params;
        const { pointsToAdd } = req.body;
        await db.execute(`
            UPDATE Customer
            SET LoyaltyPoints = LoyaltyPoints + ?
            WHERE CustomerID = ?
        `, [pointsToAdd, clientId]);
        res.json({ message: "Loyalty points updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};