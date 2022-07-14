const express = require("express");
const router = express.Router();
const Card = require("../db/service/card");

// 카드 등록 (url: /, method: PUT)
router.put("/", (req, res, next) => {
  const data = req.body;

  Card.createCard(data)
    .then(([result]) => {
      const id = result.insertId;
      res.send({ id });
    })
    .catch(next);
});

module.exports = router;
