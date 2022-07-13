import "../MenuBar/History.scss";

export default class History {
  mock = [
    {
      "title": "HTML/CSS 공부하기",
      src: "해야할 일",
      dest: "하고있는 일",
      act: "이동",
      createdAt: "2019-09-02",
    },
    { "title": "HTML/CSS 공부할 것", src: "", dest: "하고있는 일", act: "등록" },
  ];

  constructor($target) {
    this.$target = $target;
    this.render();
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
                <div class="passedTime">${data.createdAt}</div>
              </div>
           </div>`,
      )
      .join("");
  }
}
