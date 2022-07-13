import "@client/component/Board/CardList.scss";
import CardItem from "@client/component/Board/CardItem";

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
          <h2 class="cardList-title">${"title"}</h2>
          <div class="cardList-count">${"count"}</div>
        </article>
        <button class="plus-button hover-blue"></button>
        <button class="x-button hover-red"></button>
      </section>
    `;
    this.$target.appendChild(this.$cardList);

    this.$cardRealList = document.createElement("ul");
    this.$cardRealList.className = "cardList-list";
    this.$cardList.appendChild(this.$cardRealList);
    // TODO : Render from Lists Data
    this.carditem = new CardItem(this.$cardRealList);
  }
}
