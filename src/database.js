const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "todo",
  user: "kalkarshivam",
  password: "password",
});
module.exports = pool;
