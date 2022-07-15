import { requestCreateHistory } from "@client/api/history";

// 카드의 변경작업이 발생한 후 호출하면 된다.
export const requestCreateCard = (title, content, author, boardId, boardName) => {
  return requestCreateHistory("등록", "", boardName, title, author)
    .catch((err) => {
      console.log("카드 등록 히스토리 요청 API 에러 발생" + err);
    })
    .then(() =>
      fetch("/card", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, content, author, board: boardId }),
      }),
    )
    .then((res) => res.json()) // action, src, dest, target, author
    .catch((err) => {
      console.log("카드 등록 요청 API 에러 발생" + err);
    });
};

// requestCreateCard("영양제 챙겨먹기", "힘들어요 ㅠ^ㅠ", "team5", 1, "해야할 일");
export const requestUpdateCard = (id, title, content, author, boardName) => {
  return requestCreateHistory("수정", "", boardName, title, author)
    .then(() =>
      fetch(`/card/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, content }),
      }),
    )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("카드 수정 요청 API 에러 발생" + err);
    });
};

export const requestDeleteCard = (id, title, author, boardName) => {
  return requestCreateHistory("삭제", "", boardName, title, author)
    .then(() =>
      fetch(`/card/${id}`, {
        method: "DELETE",
      }),
    )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("카드 삭제 요청 API 에러 발생" + err);
    });
};

// src, dest => boardId, srcName, destName => boardName
export const requestMoveCard = (src, dest, target, srcName, destName, targetName) => {
  return requestCreateHistory("이동", srcName, destName, targetName, author)
    .then(() =>
      fetch(`/move`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ src, dest, target }),
      }),
    )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("카드 이동 요청 API 에러 발생" + err);
    });
};
