
const mysql = require('mysql');
const env = require('dotenv');

env.config();
const urlDB=`mysql://root:vxnTTnThHwEOWndmHPvVqPsCvjneYHHE@monorail.proxy.rlwy.net:12399/railway`
const pool = mysql.createPool({
urlDB
});

module.exports = pool;
