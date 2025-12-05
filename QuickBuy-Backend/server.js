const express = require('express');
const cors = require('cors');
// require('dotenv').config(); // Nếu bạn có dùng biến môi trường

const app = express();
// SỬA ĐƯỜNG DẪN TẠI ĐÂY:
const cartRoutes = require('./src/routes/cartRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'QuickBuy API is running!' });
});

app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});