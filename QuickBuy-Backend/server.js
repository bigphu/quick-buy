const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Nếu bạn có dùng biến môi trường

const app = express();
// SỬA ĐƯỜNG DẪN TẠI ĐÂY:
const cartRoutes = require('./src/routes/cartRoutes');
const productsRoutes = require('./src/routes/productRoutes');
const clientRoutes = require('./src/routes/clientRoute');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/cart', cartRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
const PORT = Number(process.env.APP_PORT || 8080);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});