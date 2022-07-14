const express = require("express");
const router = express.Router();
const pool = require("../db/loader");
const { parseQueryString } = require("./util");

// 히스토리 조회
router.get("/all", (req, res, next) => {
  const dict = parseQueryString(req.url);

  const query = dict.last
    ? `select * from history where history.id > ${dict.last} ORDER BY created_at DESC`
    : "select * from history ORDER BY created_at DESC";

  pool.query(query, (err, results, fields) => {
    if (err) res.json({ message: "히스토리 조회에 실패했습니다." });
    else res.json({ history: results });
  });
});

// 히스토리 등록
router.post("/", (req, res, next) => {
  const { action, src, dest, target, author } = req.body;
  const value = [action, src, dest, target, author];

  pool.query(
    "INSERT INTO history (action, src, dest, target, author) VALUES (?, ?, ?, ?, ?)",
    value,
    (err, result, field) => {
      console.log(err, result, field);
      if (err) res.json({ message: "히스토리 등록에 실패했습니다." });
      else res.status("ok");
    },
  );
  res.json("ok");
});

module.exports = router;
