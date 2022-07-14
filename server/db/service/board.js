const pool = require("../loader");
const promisePool = pool.promise();

module.exports = {
  getAllBoardInfos() {
    return promisePool.execute(`SELECT * FROM board`);
  },
  getAllCardsWithBoard() {
    return promisePool.execute(
      `
        SELECT *
        FROM
          board AS b
          LEFT JOIN card AS c ON b.id = c.board
        WHERE c.id IS NOT NULL
      `,
    );
  },
  groupCardsByBoards(boards, cards) {
    const arrayToBoardObject = (obj, target) => {
      const { id } = target;
      obj[id] = {
        ...target,
        count: 0,
        cards: [],
      };
      return obj;
    };

    const groupedObj = boards.reduce(arrayToBoardObject, {});

    cards.forEach((card) => {
      const boardID = card.board;
      groupedObj[boardID].cards.push(card);
    });
    return Object.values(groupedObj);
  },
};
