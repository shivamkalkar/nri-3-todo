const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5433,
  database: "todo",
  user: "kalkarshivam",
  password: "password",
});
module.exports = pool;
