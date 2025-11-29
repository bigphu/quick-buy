const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

// Định nghĩa các đường dẫn con cho /api/products
router.get("/:productId/low-stock", productsController.getLowStock);
router.get("/top-rated/:category", productsController.getTopRated);

module.exports = router;