import mysql from 'mysql2/promise';
import 'dotenv/config';

console.log("Database User:", process.env.DB_USER);

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// In 'mysql2/promise', 'pool' is already compatible with promises/async-await.
// We export it as the default export.
export default db;