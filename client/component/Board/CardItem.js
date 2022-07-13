import "@client/component/Board/CardItem.scss";

export default class CardItem {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  init() {
    const { $cardItem } = this;
    const $button = $cardItem.querySelector("#cardItem-delete");
    $button.addEventListener("mouseenter", () => {
      $cardItem.classList.toggle("cardItem-highlighted", true);
    });
    $button.addEventListener("mouseleave", () => {
      $cardItem.classList.toggle("cardItem-highlighted", false);
    });
  }

  render() {
    this.$cardItem?.remove();
    this.$cardItem = document.createElement("li");
    this.$cardItem.className = "cardItem";
    // TODO : Render datas
    this.$cardItem.innerHTML = `
      <article class="cardItem-main text-undraggable">
        <h3 class="cardItem-title">${"title"}</h3>
        <p class="cardItem-content">${"content"}</p>
        <span class="cardItem-author">${"author"}</span>
      </article>
      <button id="cardItem-delete" class="x-button"></button>
    `;
    this.$target.appendChild(this.$cardItem);
    this.init();
  }
}
