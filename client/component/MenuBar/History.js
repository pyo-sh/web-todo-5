import "../MenuBar/History.scss"; // <- at the top of your entry point
// import "core-js/es/promise";

export default class History {
  history = [];

  constructor($target) {
    this.$target = $target;
    this.render();
  }

  setHistory(history) {
    this.history = history;
    this.render();
  }

  getPassedTime(date) {
    const createDate = new Date(date);
    const todayDate = new Date();

    const diffTime = todayDate.getTime() - createDate.getTime(); // ms 단위
    const diffSeconds = Math.floor(diffTime / 1000);

    if (diffSeconds < 60) {
      return diffSeconds + "초 전";
    }
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return diffMinutes + "분 전";
    }
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 24) {
      return diffHours + "시간 전";
    }

    let dateText = `${createDate.getMonth() + 1}월 ${createDate.getDay() + 1}일`;

    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 31));

    if (diffMonths < 31) {
      dateText = `${createDate.getFullYear()}년 ${dateText}`;
    }

    return dateText;
  }

  // 텍스트 끝 문자의 종성을 구하는 함수
  getLastConsonant(text) {
    let lastConsonant = "";

    const index = (text.charCodeAt(text.length - 1) - 44032) % 28;
    if (index > 0) {
      lastConsonant += String.fromCharCode(index + 4519);
    }

    return lastConsonant;
  }

  getCardContentHTML({ target, act, src, dest }) {
    if (act === "이동") {
      return `<span class="bold">${target}</span>${
        this.getLastConsonant(target) === "" ? "를" : "을"
      } <span class="bold">${src}</span>에서 <span class="bold">${dest}</span>로 <span class="bold">${act}</span>했습니다.
      `;
      return;
    }
    return `<span class="bold">${dest}</span>에 <span class="bold">${target}</span>${
      this.getLastConsonant(target) === "" ? "를" : "을"
    } <span class="bold">${act}</span>했습니다.
    `;
  }

  fetchHistory() {
    // lastId를 전달한다.
    const HISTORY_LENGTH = this.history.length;
    const LAST_ID = HISTORY_LENGTH >= 1 ? this.history[HISTORY_LENGTH - 1].id : 0;
    requestHistory(LAST_ID)
      .then((res) => {
        // 새로받은 history를 이어 붙인다.
        const newHistory = [...res, ...this.history];
        this.setHistory(newHistory);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setHistory(history) {
    this.history = history;
    this.render();
  }

  render() {
    this.$history?.remove();
    this.$history = document.createElement("div");
    this.$history.className = "history";
    this.$target.appendChild(this.$history);

    this.$history.innerHTML = this.history
      .map(
        (data) =>
          `<div class="historyCard">
            <div>🥳</div>
              <div class="section">
                <div>
                  ${this.getCardContentHTML(data)}
                </div>
                <div class="passedTime">${this.getPassedTime(data.createdAt)}</div>
              </div>
           </div>`,
      )
      .join("");
  }
}

const requestHistory = (lastId) => {
  const res = [
    {
      id: 1,
      target: "HTML/CSS 공부하기",
      src: "해야할 일",
      dest: "하고있는 일",
      act: "이동",
      author: "Hyeondoonge",
      createdAt: "2022-07-14 10:53:01",
    },
    {
      id: 3,
      target: "Javascirpt 공부",
      src: "",
      dest: "하고있는 일",
      act: "등록",
      createdAt: "2022-07-14 10:28:01",
    },
    {
      id: 4,
      target: "서브웨이 가기",
      src: "",
      dest: "하고있는 일",
      act: "등록",
      author: "Hyeondoonge",
      createdAt: "2022-07-12 10:28:01",
    },
    {
      id: 5,
      target: "this 공부하기",
      src: "",
      dest: "하고있는 일",
      act: "등록",
      author: "Hyeondoonge",
      createdAt: "2022-07-10 10:28:01",
    },
    {
      id: 6,
      target: "집 가기",
      src: "",
      dest: "하고있는 일",
      act: "등록",
      author: "Hyeondoonge",
      createdAt: "2022-04-14 10:28:01",
    },
    {
      id: 7,
      target: "주말에는 휴식 취할 것",
      src: "하는 중",
      dest: "하고있는 일",
      act: "이동",
      author: "Hyeondoonge",
      createdAt: "2022-04-14 10:28:01",
    },
  ];

  // request history API
  // fetch(/all?last=${lastId})

  // api에서 데이터를 보내기전 flip을 해서 보내줘야한다. (아마?, 최신순으로 보여줘야하니까)

  return new Promise((resolve, reject) => {
    // 실제로는 id를 기준으로 그 후의 데이터를 가져온다.
    setTimeout(() => {
      try {
        // fetch 함수를 통해 받아온 데이터 resolve
        resolve(res);
      } catch (error) {
        reject(error);
      }
    }, 3000);
  })
    .then((res) => {
      if (res) return res;
      // if (res.ok) return res;
      throw new Error("fetch 에러 발생");
    })
    .catch((error) => {
      console.log(error);
    });
};
