// src/config/dbConfig.js
const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // e.g., 'your-server-name.database.windows.net'
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use this if you're connecting to Azure
    enableArithAbort: true,
  },
  connectionTimeout: 30000, // Increase to 30 seconds
  requestTimeout: 30000,
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to Azure SQL Database');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed! ', err));

module.exports = {
  sql, poolPromise,
};
