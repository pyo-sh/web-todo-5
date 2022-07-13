import "@client/component/header.scss";
import MenuButton from "@client/component/MenuBar/MenuButton";

export default class Header {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$header = document.createElement("header");
    this.$header.className = "header";
    this.$header.innerHTML = `
        <div class="header-title">TO-DO-LIST</div>
    `;
    this.$target.appendChild(this.$header);
    this.menuButton = new MenuButton(this.$header);
  }
}
