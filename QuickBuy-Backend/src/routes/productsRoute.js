import express from "express";
import ProductsController from "../controllers/productsController.js";

const ProductsRoutes = express.Router();

// Định nghĩa các đường dẫn con cho /api/products
ProductsRoutes.get("/:productId/low-stock", ProductsController.getLowStock);
ProductsRoutes.get("/top-rated/:category", ProductsController.getTopRated);

export default ProductsRoutes;