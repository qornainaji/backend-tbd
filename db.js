const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "52.186.138.183",
    database: "book_store",
    password: "esklimenaq",
    port: 5432,
});

module.exports = pool;