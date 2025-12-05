const mysql = require('mysql2/promise');
require('dotenv').config();
try {
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Khong chay duoc');
module.exports = pool;
}
catch {
    console.log("Tuedeptrai");
}
