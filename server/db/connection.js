// db/connection.js - Database connection setup
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tabibi_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function for queries
async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = { query, pool };