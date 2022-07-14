// 카드의 변경작업이 발생한 후 호출하면 된다.
const requestCreateHistory = (action, src, dest, target, author) => {
  return fetch("/history", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ action, src, dest, target, author }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("히스토리 등록 요청 API 에러 발생" + err);
    });
};

const requestGetAllHistory = (lastId) => {
  return fetch(`/history/all?last=${lastId}`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("히스토리 조회 요청 API 에러 발생" + err);
    });
};

module.exports = { requestCreateHistory, requestGetAllHistory };
