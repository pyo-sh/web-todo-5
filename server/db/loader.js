const mysql = require("mysql2");
const checkBoardTable = require("./repository/board");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

(async function init() {
  await checkBoardTable(pool);

  console.log("ALL TABLE CHECKED!");
})();

module.exports = pool;
