import "@client/component/MenuBar/MenuBar.scss";
import History from "./History";

export default class MenuBar {
  isMenuBarOpen = false;
  MENUBAR_SHOW_POS = "70vw";
  MENUBAR_HIDE_POS = "100vw";

  constructor($target) {
    this.$target = $target;
    this.render();
  }

  toggleMenuBar() {
    if (this.isMenuBarOpen) {
      this.isMenuBarOpen = false;
      this.$menuBar.style.left = this.MENUBAR_HIDE_POS;
    } else {
      this.isMenuBarOpen = true;
      this.$menuBar.style.left = this.MENUBAR_SHOW_POS;
    }
  }

  render() {
    // Layout을 먼저 잡고 component를 그려내는 코드
    this.$menuBar = document.createElement("div");
    this.$menuBar.className = "menuBar";
    this.$menuBar.innerHTML = `
    <div class="section1">
      <button class="closeButton">X</button>
    </div>
    <div class="section2" />`;
    this.$target.appendChild(this.$menuBar);

    this.history = new History(document.querySelector(".menuBar .section2"));
  }
}
