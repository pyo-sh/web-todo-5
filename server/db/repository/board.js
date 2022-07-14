const checkBoardTable = (pool) => {
  const promisePool = pool.promise();
  console.log("BOARD TABLE CHECK...");

  return promisePool
    .execute(
      `
      CREATE TABLE IF NOT EXISTS board (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL
      );
      `,
    )
    .then(() => {
      console.log("BOARD TABLE CHECKED!");
    })
    .catch(console.log);
};

module.exports = checkBoardTable;
