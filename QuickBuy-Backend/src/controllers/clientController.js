const db = require('../config/db');

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
            SELECT o.OrderID, o.OrderDate, o.TotalPrice, o.Status
            FROM \`Order\` o
            WHERE o.customerID = ?    
            ORDER BY o.OrderDate DESC
        `, [clientId]);
        res.json({ orders: rows });
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
            UPDATE Client
            SET LoyaltyPoints = LoyaltyPoints + ?
            WHERE ClientID = ?
        `, [pointsToAdd, clientId]);
        res.json({ message: "Loyalty points updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};