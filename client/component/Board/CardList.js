import "@client/component/Board/CardList.scss";

export default class CardList {
  constructor($target) {
    this.$target = $target;
    this.render();
  }
  render() {
    this.$cardList?.remove();
    this.$cardList = document.createElement("div");
    this.$cardList.className = "cardList";
    // TODO : Render datas
    this.$cardList.innerHTML = `
      <section class="cardList-header text-undraggable">
        <article class="cardList-strengther">
          <h2 class="cardList-title">해야할 일</h2>
          <div class="cardList-count">2</div>
        </article>
        <button class="plus-button"></button>
        <button class="x-button"></button>
      </section>
      <ul class="cardList-list"></ul>
    `;
    this.$target.appendChild(this.$cardList);
  }
}
