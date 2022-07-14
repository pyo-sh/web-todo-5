const getAllBoards = () => {
  return fetch("/board/all", { method: "GET" }).then((res) => {
    return res.json();
  });
};

module.exports = { getAllBoards };
