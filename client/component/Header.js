import "@client/component/Header.scss";
import MenuButton from "@client/component/MenuBar/MenuButton";
import MenuBar from "@client/component/MenuBar/MenuBar";

export default class Header {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  init() {
    this.$header.addEventListener("click", (event) => {
      const $closeButton = event.target.closest(".closeButton");
      const $menuButton = event.target.closest(".menuButton");

      if (!$closeButton && !$menuButton) return;

      this.menuBar.toggleMenuBar();
    });
  }

  render() {
    this.$header = document.createElement("header");
    this.$header.className = "header";
    this.$header.innerHTML = `
        <div class="header-title">TO-DO-LIST</div>
    `;
    this.$target.appendChild(this.$header);
    this.menuButton = new MenuButton(this.$header);
    this.menuBar = new MenuBar(this.$header);

    this.init();
  }
}
