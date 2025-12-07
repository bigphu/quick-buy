const ProductsService = require("../services/productsService");

const ProductsController = {

    // Route: /products/:productId/low-stock
    getLowStock: async (req, res) => {
        try {
            const productId = req.params.productId;
            const { city, threshold } = req.query;

            // Basic HTTP Validation (Presence check)
            if (!city || !threshold) {
                return res.status(400).json({
                    success: false,
                    message: "Missing query parameters: 'city' and 'threshold' are required."
                });
            }

            // Call Service (Logic & DB)
            const results = await ProductsService.getLowStock(city, productId, threshold);

            res.json({ success: true, data: results });

        } catch (error) {
            // Handle Custom Validation Errors
            if (error.message.startsWith("VALIDATION_ERROR")) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            console.error(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const results = await ProductsService.getAllCategories();
            res.json({ success: true, count: results.length, data: results });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    // Route: /products/top-rated/:category
    getTopRated: async (req, res) => {
        try {
            const category = req.params.category;
            const { minRating, storeId } = req.query;

            // Default to 0 if not provided, but Service will still validate range
            const ratingToCheck = minRating || 0;
            const storeIdToCheck = storeId || null;

            // Call Service (Logic & DB)
            const results = await ProductsService.getTopRated(category, ratingToCheck, storeIdToCheck);

            res.json({
                success: true,
                category: category,
                count: results.length,
                data: results
            });

        } catch (error) {
            // Handle Custom Validation Errors
            if (error.message.startsWith("VALIDATION_ERROR")) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            console.error(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    // Route: /products/store/:storeId
    getAllByStore: async (req, res) => {
        try {
            const storeId = req.params.storeId;

            const results = await ProductsService.getAllByStore(storeId);

            res.json({
                success: true,
                storeId: storeId,
                count: results.length,
                data: results
            });

        } catch (error) {
            if (error.message.startsWith("VALIDATION_ERROR")) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            console.error(error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
};

module.exports = ProductsController;