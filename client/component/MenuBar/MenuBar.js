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

  init() {
    window.addEventListener("click", (event) => {
      const $menuBar = event.target.closest(".menuBar");
      const $menuButton = event.target.closest(".menuButton");

      if ($menuBar || $menuButton) return;

      if (this.isMenuBarOpen) {
        this.toggleMenuBar();
      }
    });
  }

  toggleMenuBar() {
    if (this.isMenuBarOpen) {
      this.isMenuBarOpen = false;
      this.$menuBar.style.left = this.MENUBAR_HIDE_POS;
    } else {
      this.history.fetchHistory();
      // 이와함께 id가 변경된다.
      this.isMenuBarOpen = true;
      // history set State를 호출해준다
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
    this.init();
  }
}
