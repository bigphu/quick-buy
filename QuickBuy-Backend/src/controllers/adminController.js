const db = require('../config/db')
exports.tue = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        // console.log(req.params);
        const query = `
            SELECT CustomerID, FirstName, LastName, Email
            FROM customer 
            WHERE CustomerID =  ?
        `;

        var [results] = await db.query(query, [userId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [pointsResult] = await db.query('SELECT fn_calculate_loyaltypoints(?) as points', [userId]);
        results[0].points = pointsResult[0].points;
        // console.log(results[0]);
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.tue2 = async (req, res) => {
    try {
        const productId = parseInt(req.params.productId, 10);

        // Add validation
        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const query = 'SELECT ProductID, ProductName, ProductPrice FROM product WHERE ProductID = ?';
        var [results] = await db.query(query, [productId]);
        console.log(results[0]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const [pointsResult] = await db.query('SELECT fn_getstockstatuslabel(?) as statusLabel', [productId]);
        const query2 = 'SELECT IFNULL(SUM(Quantity), 0) AS TotalStock FROM store_product WHERE ProductID = ?';
        const [stockRows] = await db.query(query2, [productId]);

        results[0].status = pointsResult[0].statusLabel;
        results[0].stock = Number(stockRows[0].TotalStock || 0);
        console.log(results[0]);
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all customers for dropdown selector
exports.getAllCustomers = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT CustomerID as id, CONCAT(FirstName, ' ', LastName) as name, Email
            FROM Customer
            ORDER BY CustomerID
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all stores for dropdown selector
exports.getAllStores = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT StoreID as id, CONCAT(Name, ' - ', City) as name, City
            FROM Store
            ORDER BY StoreID
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const [[orderStats]] = await db.query(`
            SELECT
                COUNT(*) AS totalSales,
                IFNULL(SUM(TotalPrice), 0) AS totalRevenue
            FROM \`Order\`
        `);

        const [[customerStats]] = await db.query(`
            SELECT
                COUNT(*) AS activeUsers,
                IFNULL(SUM(LoyaltyPoints), 0) AS totalLoyaltyPoints
            FROM Customer
        `);

        res.json({
            totalRevenue: Number(orderStats.totalRevenue || 0),
            totalSales: Number(orderStats.totalSales || 0),
            activeUsers: Number(customerStats.activeUsers || 0),
            totalLoyaltyPoints: Number(customerStats.totalLoyaltyPoints || 0)
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};