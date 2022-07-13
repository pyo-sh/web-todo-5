import "../MenuBar/History.scss";

export default class History {
  constructor($target) {
    this.$target = $target;
    this.render();
  }
  render() {
    this.$history = document.createElement("div");
    this.$history.className = "history";
    this.$target.appendChild(this.$history);
  }
}
