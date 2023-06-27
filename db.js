const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "20.169.214.249",
    database: "postgres",
    password: "1234",
    port: 5432,
});

module.exports = pool;