import "@client/component/Board/CardActive.scss";
import { requestCreateCard } from "@client/api/card";

export default class CardActive {
  state = { content: "", title: "" };

  constructor($target, { board, onClickCreateCard }) {
    this.$target = $target;
    this.board = board;
    this.render();
  }

  init() {
    const { $cardActive } = this;
    const $textarea = $cardActive.querySelector("#cardActive-content");
    const adjustTextareaHeight = (e) => {
      const element = e.target;
      element.style.height = "0px";
      const scroll_height = element.scrollHeight;
      element.style.height = `${scroll_height}px`;
    };
    adjustTextareaHeight({ target: $textarea });
    $textarea.addEventListener("input", adjustTextareaHeight);

    // 등록 클릭 시
    this.$cardActive.addEventListener("click", (event) => {
      const $accessButton = event.target.closest("#cardActive-access");
      if (!$accessButton) return;

      const { title: cardTitle, content } = this.state;
      const { id, title: boardTitle } = this.board;

      requestCreateCard(cardTitle, content, "team5", id, boardTitle);
    });

    // 인풋 있을 때 상태 변경
    this.$cardActive.addEventListener("change", (event) => {
      const $title = event.target.closest(".cardActive-title");
      if (!$title) return;
      this.setState({ ...this.state, title: event.target.value });
    });

    this.$cardActive.addEventListener("change", (event) => {
      const $content = event.target.closest("#cardActive-content");
      if (!$content) return;
      this.setState({ ...this.state, content: event.target.value });
    });
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  render() {
    this.$cardActive?.remove();
    this.$cardActive = document.createElement("li");
    this.$cardActive.className = "cardActive";
    // TODO : Render datas
    this.$cardActive.innerHTML = `
      <input
        class="cardActive-title"
        placeholder="제목을 입력하세요"
        maxlength="50"
        value=${this.state.title}
      >
      <textarea
        id="cardActive-content"
        class="cardActive-content"
        placeholder="내용을 입력하세요"
        maxlength="500"
      >${this.state.content}</textarea>
      <article class="cardActive-buttons">
        <button id="cardActive-cancel" class="cardActive-button">
          ${"취소"}
        </button>
        <button id="cardActive-access" class="cardActive-button">
          ${"수정"}
        </button>
      </article>
    `;
    this.$target.appendChild(this.$cardActive);

    this.init();
  }
}
