
const mysql = require('mysql');
const env = require('dotenv');

env.config();
const urlDB=`mysql -hmonorail.proxy.rlwy.net -uroot -pvxnTTnThHwEOWndmHPvVqPsCvjneYHHE --port 12399 --protocol=TCP railway`
const pool = mysql.createPool({
urlDB
});

module.exports = pool;
