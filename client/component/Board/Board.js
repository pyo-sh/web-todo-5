import "@client/component/Board/Board.scss";
import CardList from "@client/component/Board/CardList";
import { getAllBoards } from "@client/api/board";

export default class Board {
  constructor($target) {
    this.$target = $target;
    this.state = { boards: [] };
    this.render();

    getAllBoards().then((data) => {
      this.setState(data);
    });
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$board?.remove();
    this.$board = document.createElement("div");
    this.$board.className = "board";
    this.$target.appendChild(this.$board);

    const $board = this.$board;
    this.cardLists = this.state.boards.map((boardData) => {
      return new CardList($board, boardData);
    });
  }
}
