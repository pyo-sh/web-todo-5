const express = require("express");
const router = express.Router();
const Card = require("../db/service/card");

// 카드 등록 (url: /, method: PUT)
router.put("/", (req, res, next) => {
  const data = req.body;

  Card.createCard(data)
    .then(([result]) => {
      const id = result.insertId;
      res.send({ id, message: "정상적으로 추가됐습니다." });
    })
    .catch(next);
});

// 카드 삭제 (url: /:id, method: DELETE)
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Card.deleteCard(id)
    .then(() => {
      res.send({ message: "정상적으로 삭제됐습니다." });
    })
    .catch(next);
});

// 카드 수정 (url: /:id, method: PATCH)
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Card.updateCard(id, data)
    .then(() => {
      res.send({ message: "정상적으로 수정됐습니다." });
    })
    .catch(next);
});

module.exports = router;
