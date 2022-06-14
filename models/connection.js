const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '207455',
  host: process.env.MYSQL_host || 'localhost',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;