import hamburger from "@client/image/hamburger.svg";
import "@client/component/MenuBar/MenuButton.scss";

export default class MenuButton {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  init() {}

  render() {
    this.$menuButton = document.createElement("button");
    this.$menuButton.className = "menuButton";
    this.$menuButton.innerHTML = `<img src=${hamburger} />`;

    this.$target.appendChild(this.$menuButton);
    this.init();
  }
}
