const mysql = require("mysql2");
const checkBoardTable = require("./repository/board");
const checkCardTable = require("./repository/card");

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
  await checkCardTable(pool);

  console.log("ALL TABLE CHECKED!");
})();

module.exports = pool;
