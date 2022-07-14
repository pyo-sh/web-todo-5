import "@client/component/Board/CardActive.scss";

export default class CardActive {
  constructor($target) {
    this.$target = $target;
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
    adjustTextareaHeight();
    $textarea.addEventListener("input", adjustTextareaHeight);
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
        value=${"title"}
      />
      <textarea
        id="cardActive-content"
        class="cardActive-content"
        placeholder="내용을 입력하세요"
      >${"content"}</textarea>
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
