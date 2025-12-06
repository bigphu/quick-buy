const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Nếu bạn có dùng biến môi trường

const app = express();
// SỬA ĐƯỜNG DẪN TẠI ĐÂY:
const cartRoutes = require('./src/routes/cartRoutes');
const productsRoutes = require('./src/routes/productRoutes');
const clientRoutes = require('./src/routes/clientRoute');



app.use(cors());
app.use(express.json());

app.use('/api/cart', cartRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/client', clientRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});