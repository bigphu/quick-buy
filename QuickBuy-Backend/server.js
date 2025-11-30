import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize dotenv configuration
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
// import cartRoutes from './src/routes/cartRoutes.js';
import ProductsRoutes from "./src/routes/productsRoute.js";
// import clientRoutes from './src/routes/userRoutes.js'; // Uncomment when created

// Use Routes
// app.use('/api/cart', cartRoutes);
app.use('/api/products', ProductsRoutes);
// app.use('/api/clients', clientRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('QuickBuy API is running...');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // console.log(`Test Low Stock: http://localhost:${PORT}/api/products/1/low-stock?city=NewYork&threshold=10`);
    // console.log(`Test Top Rated: http://localhost:${PORT}/api/products/top-rated/Electronics?minRating=4`);
});