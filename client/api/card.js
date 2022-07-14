import { requestCreateHistory } from "@client/api/history";
// 카드의 변경작업이 발생한 후 호출하면 된다.
const requestCreateCard = (title, content, author, board) => {
  return fetch("/card", {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title, content, author, board }),
  })
    .then((res) => res.json()) // action, src, dest, target, author
    .catch((err) => {
      console.log("카드 등록 요청 API 에러 발생" + err);
    });
};

const requestUpdateCard = (id, title, content) => {
  return fetch(`/card/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("카드 수정 요청 API 에러 발생" + err);
    });
};

const requestDeleteCard = (id) => {
  return fetch(`/card/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("카드 삭제 요청 API 에러 발생" + err);
    });
};

const requestMoveCard = (src, dest, target) => {
  return fetch(`/move`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ src, dest, target }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("카드 이동 요청 API 에러 발생" + err);
    });
};

module.exports = { requestCreateCard, requestUpdateCard, requestDeleteCard, requestMoveCard };
