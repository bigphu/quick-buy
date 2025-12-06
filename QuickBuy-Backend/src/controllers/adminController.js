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
        const [pointsResult] = await db.query('SELECT fn_calculate_loyaltypoints(?)', [userId]);
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

        const [pointsResult] = await db.query('SELECT fn_getstockstatuslabel(?) as points', [productId]);
        const query2 = 'SELECT Quantity FROM store_product WHERE ProductID = ?';
        const [point] = await db.query(query2, [productId]);

        results[0].status = pointsResult[0].points;
        results[0].stock = point[0].Quantity;
        console.log(results[0]);
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};