import "../MenuBar/History.scss"; // <- at the top of your entry point
import { requestGetAllHistory } from "@client/api/history";

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

  getCardContentHTML({ target, action, src, dest }) {
    if (action === "이동") {
      return `<span class="bold">${target}</span>${
        this.getLastConsonant(target) === "" ? "를" : "을"
      } <span class="bold">${src}</span>에서 <span class="bold">${dest}</span>로 <span class="bold">${action}</span>했습니다.
      `;
      return;
    }
    return `<span class="bold">${dest}</span>에 <span class="bold">${target}</span>${
      this.getLastConsonant(target) === "" ? "를" : "을"
    } <span class="bold">${action}</span>했습니다.
    `;
  }

  fetchHistory() {
    // lastId를 전달한다.
    const HISTORY_LENGTH = this.history.length;
    const LAST_ID = HISTORY_LENGTH >= 1 ? this.history[0].id : 0;

    requestGetAllHistory(LAST_ID)
      .then((res) => {
        const { history } = res;
        // 새로받은 history를 이어 붙인다.
        const newHistory = [...history, ...this.history];
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
                <div class="passedTime">${this.getPassedTime(data.created_at)}</div>
              </div>
           </div>`,
      )
      .join("");
  }
}
