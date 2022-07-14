const express = require("express");
const router = express.Router();
const Board = require("../db/service/board");

// 카드 등록 (url: /all, method: GET)
router.get("/all", (req, res, next) => {
  let boards = null;
  let cards = null;

  Board.getAllBoardInfos()
    .then(([rows]) => {
      boards = rows;
      return Board.getAllCardsWithBoard();
    })
    .then(([rows]) => {
      cards = rows;
      const allBoards = Board.groupCardsByBoards(boards, cards);
      res.send({ boards: allBoards });
    })
    .catch(next);
});

module.exports = router;
