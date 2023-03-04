const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "nevermind",
  database: "moviesdb",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
