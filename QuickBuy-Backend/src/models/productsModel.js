import db from "../config/db.js";

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

    // Calls sp_GetTopRatedProducts
    getTopRated: async (categoryName, minRating) => {
        try {
            const [rows] = await db.execute(
                'CALL sp_GetTopRatedProducts(?, ?)', 
                [categoryName, minRating]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
};

export default ProductsModel;