const pool = require("../loader");
const promisePool = pool.promise();

module.exports = {
  getAllHistory() {
    return promisePool.execute(`select * from history`);
  },
  getNewHistoriesById(lastId) {
    return promisePool.execute(
      lastId
        ? `select * from history where history.id > ${lastId} ORDER BY created_at DESC`
        : "select * from history ORDER BY created_at DESC",
    );
  },
  createHistory(values) {
    return promisePool.execute(
      `INSERT INTO history (action, src, dest, target, author) VALUES (?, ?, ?, ?, ?)`,
      values,
    );
  },
};
