const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool({
    connectionLimit : config.db_connectionLimit,
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
  });

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

module.exports = pool;