import Header from "@client/component/Header";

// 상태관리를 필요로 하는 덩어리들을 컴포넌트로 만든다.
export default class App {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$app?.remove();
    this.$app = document.createElement("div");
    this.$app.id = "root";
    this.$target.appendChild(this.$app);
    this.header = new Header(this.$app);
  }
}
