const checkCardTable = (pool) => {
  const promisePool = pool.promise();
  console.log("CARD TABLE CHECK...");

  return promisePool
    .execute(
      `
      CREATE TABLE IF NOT EXISTS card (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL,
        author VARCHAR(14) NOT NULL,
        ordered INT NOT NULL,
        board INT NOT NULL,
        FOREIGN KEY (board) REFERENCES board(id) ON UPDATE CASCADE
      );
      `,
    )
    .then(() => {
      console.log("CARD TABLE CHECKED!");
    })
    .catch(console.log);
};

module.exports = checkCardTable;
