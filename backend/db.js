const mysql = require('mysql2');
const env = require('dotenv');

// Load environment variables from a .env file (if you're using one)
env.config();

// Connection string from Railway
const connectionString = process.env.MYSQL_CONNECTION_STRING  ;

// Parse the connection string
const url = require('url');
const connectionParams = url.parse(connectionString);
const [username, password] = connectionParams.auth.split(':');

// Create a connection pool
const pool = mysql.createPool({
  host: connectionParams.hostname,
  port: connectionParams.port,
  user: username,
  password: password,
  database: connectionParams.pathname.split('/')[1]
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool;
