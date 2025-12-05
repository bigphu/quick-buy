const db = require('../config/db')
exports.tue  = async (req,res) => {
    try {
        const  userId  = parseInt(req.params.userId,10);;
        console.log(req.params);
        const query = `
            SELECT UserID, FirstName, LastName, Email
            FROM user 
            WHERE UserID =  ?
        `;
        
        var [results] = await db.query(query, [userId]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [pointsResult] = await db.query('SELECT fn_calculate_loyaltypoints(?) as points',[userId]);
        results[0].points = pointsResult[0].points;
        console.log(results[0]);
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}