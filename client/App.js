export default class App {
  constructor($target) {
    this.$app = document.createElement("div");
    this.$app.id = "root";
    $target.appendChild(this.$app);

    this.render();
  }
  render() {
    this.$app.innerHTML = `
        <div id="root"></div>
    `;
  }
}
