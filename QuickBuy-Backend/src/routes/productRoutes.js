const express = require("express");
const ProductsController = require("../controllers/productController");

const ProductsRoutes = express.Router();

// Định nghĩa các đường dẫn con cho /api/products
ProductsRoutes.get("/categories", ProductsController.getAllCategories);
ProductsRoutes.get("/top-rated/:category", ProductsController.getTopRated);
ProductsRoutes.get("/:productId/low-stock", ProductsController.getLowStock);

module.exports = ProductsRoutes;