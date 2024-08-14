
const mysql = require('mysql');
const env = require('dotenv');

env.config();
const urlDB=process.env.MYSQL_PUBLIC_URL
const pool = mysql.createPool({
urlDB
});

module.exports = pool;
