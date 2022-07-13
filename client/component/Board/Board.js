import "@client/component/Board/Board.scss";
import CardList from "@client/component/Board/CardList";

export default class Board {
  constructor($target) {
    this.$target = $target;
    this.render();
  }
  render() {
    this.$board?.remove();
    this.$board = document.createElement("div");
    this.$board.className = "board";
    this.$target.appendChild(this.$board);

    // TODO : Render from Lists Data
    this.cardlist = new CardList(this.$board);
  }
}
