const checkHistoryTable = (pool) => {
  const promisePool = pool.promise();
  console.log("BOARD HISTORY CHECK...");

  return promisePool
    .execute(
      `
        CREATE TABLE IF NOT EXISTS history (
          id INT PRIMARY KEY AUTO_INCREMENT,
          action VARCHAR(50) NOT NULL,
          src VARCHAR(50) NOT NULL,
          dest VARCHAR(50) NOT NULL,
          target VARCHAR(50) NOT NULL,
          author VARCHAR(50) NOT NULL,
          created_at DATETIME NOT NULL DEFAULT now()
        );
        `,
    )
    .then(() => {
      console.log("HISTORY TABLE CHECKED!");
    })
    .catch(console.log);
};

module.exports = checkHistoryTable;
