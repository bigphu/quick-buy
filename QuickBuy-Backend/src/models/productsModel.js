const db = require("../config/db");

const ProductsModel = {
    // Calls sp_GetLowStockInventory
    getLowStock: async (cityName, productId, stockThreshold) => {
        try {
            const [rows] = await db.execute(
                'CALL sp_GetLowStockInventory(?, ?, ?)',
                [cityName, productId, stockThreshold]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    getAllCategories: async () => {
        try {
            const [rows] = await db.execute('SELECT * FROM Category');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Calls sp_GetTopRatedProducts
    getTopRated: async (categoryName, minRating, storeId) => {
        try {
            const [rows] = await db.execute(
                'CALL sp_GetTopRatedProducts(?, ?, ?)',
                [categoryName, minRating, storeId || null]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Get all products by store
    getAllByStore: async (storeId) => {
        try {
            const [rows] = await db.execute(
                `SELECT 
                    p.ProductID,
                    p.ProductName,
                    p.ProductPrice,
                    p.PictureUrl,
                    hp.Quantity,
                    COUNT(r.ReviewID) AS TotalReviews,
                    ROUND(AVG(r.Rating), 1) AS AverageRating
                FROM Product p
                JOIN Has_Product hp ON p.ProductID = hp.ProductID
                LEFT JOIN Product_Review r ON p.ProductID = r.ProductID
                WHERE hp.StoreID = ?
                GROUP BY p.ProductID, p.ProductName, p.ProductPrice, hp.Quantity
                ORDER BY p.ProductName`,
                [storeId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ProductsModel;