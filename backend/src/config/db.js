const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connection = mysql.createConnection({
    host: '99.83.147.192',
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        ca: fs.readFileSync(
            path.join(__dirname, '../../isrgrootx1.pem')
        ),
        rejectUnauthorized: true,
        servername: process.env.DB_HOST
    }
});

connection.connect((error) => {
    if (error) {
        console.log('Error conectando a TiDB Cloud:', error);
        return;
    }

    console.log('TiDB Cloud conectado correctamente');
});

module.exports = connection;