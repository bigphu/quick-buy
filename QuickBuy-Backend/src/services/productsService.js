const ProductsModel = require('../models/productsModel');

const ProductsService = {
    /**
     * Validates inputs and fetches low stock inventory
     */
    getLowStock: async (city, productId, threshold) => {
        // 1. Business Logic Validation
        // Ensure threshold is a number and is non-negative
        const stockThreshold = parseInt(threshold, 10);
        
        if (isNaN(stockThreshold) || stockThreshold < 0) {
            throw new Error("VALIDATION_ERROR: Stock threshold must be a non-negative integer.");
        }

        // 2. Call Data Access Layer
        return await ProductsModel.getLowStock(city, productId, stockThreshold);
    },

    /**
     * Validates inputs and fetches top rated products
     */
    getTopRated: async (category, minRating) => {
        // 1. Business Logic Validation
        // Ensure rating is between 0 and 5
        const rating = parseFloat(minRating);

        if (isNaN(rating) || rating < 0 || rating > 5) {
            throw new Error("VALIDATION_ERROR: Rating must be between 0 and 5.");
        }

        // 2. Call Data Access Layer
        return await ProductsModel.getTopRated(category, rating);
    }
};

module.exports = ProductsService;