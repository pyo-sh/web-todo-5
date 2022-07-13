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
    this.$target.appendChild(this.$cardList);
  }
}
