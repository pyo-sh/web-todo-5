import "../MenuBar/History.scss";

export default class History {
  mock = [
    {
      "title": "HTML/CSS 공부하기",
      src: "해야할 일",
      dest: "하고있는 일",
      act: "이동",
      createdAt: "2022-07-13 01:53:01",
    },
    {
      "title": "HTML/CSS 공부할 것",
      src: "",
      dest: "하고있는 일",
      act: "등록",
      createdAt: "2022-07-14 10:28:01",
    },
  ];

  constructor($target) {
    this.$target = $target;
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

  getCardContentHTML({ title, act, src, dest }) {
    if (act === "이동") {
      return `<span class="bold">${title}</span>${
        this.getLastConsonant(title) === "" ? "를" : "을"
      } <span class="bold">${src}</span>에서 <span class="bold">${dest}</span>로 <span class="bold">${act}</span>했습니다.
      `;
      return;
    }
    return `<span class="bold">${dest}</span>에 <span class="bold">${title}</span>${
      this.getLastConsonant(title) === "" ? "를" : "을"
    } <span class="bold">${act}</span>했습니다.
    `;
  }

  render() {
    this.$history = document.createElement("div");
    this.$history.className = "history";
    this.$target.appendChild(this.$history);

    this.$history.innerHTML = this.mock
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
