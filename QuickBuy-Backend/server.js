const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const cartRoutes = require('./src/routes/cartRoutes');
const productRoutes = require('./src/routes/productRoutes');
// const clientRoutes = require('./src/routes/userRoutes'); // Uncomment khi đã tạo file

// Sử dụng Routes
// Mọi request bắt đầu bằng /api/cart sẽ đi vào cartRoutes
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/clients', clientRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('QuickBuy API is running...');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});