const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// MySQL database connection setup
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;
