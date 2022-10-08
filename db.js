const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "PUMPIM",
    password: "postparool",
});

module.exports = pool;