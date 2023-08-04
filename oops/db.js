const mysql = require('mysql2');

const mysqlConnectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'billing'
})

module.exports = mysqlConnectionPool;