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
  }
}
