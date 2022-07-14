import "@client/component/Board/CardList.scss";
import CardItem from "@client/component/Board/CardItem";
import CardActive from "@client/component/Board/CardActive";

export default class CardList {
  constructor($target, board) {
    this.$target = $target;
    this.state = board;
    this.render();
  }
  render() {
    const { title, cards } = this.state;

    this.$listWrapper?.remove();
    this.$listWrapper = document.createElement("div");
    this.$listWrapper.className = "cardList";
    this.$listWrapper.innerHTML = `
      <section class="cardList-header text-undraggable">
        <article class="cardList-strengther">
          <h2 class="cardList-title">${title}</h2>
          <div class="cardList-count">${cards.length}</div>
        </article>
        <button class="plus-button hover-blue"></button>
        <button class="x-button hover-red"></button>
      </section>
    `;
    this.$target.appendChild(this.$listWrapper);

    this.$cardList = document.createElement("ul");
    this.$cardList.className = "cardList-list";
    this.$listWrapper.appendChild(this.$cardList);

    const $cardList = this.$cardList;
    this.cardItems = this.state.cards.map((card) => {
      return new CardItem($cardList, card);
    });
  }
}
