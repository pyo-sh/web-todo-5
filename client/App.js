import Component from "@client/lib/Component";
import Header from "@client/component/Header";

function App() {
  return `
    <div id="root">
      ${Header()}
      App
    </div>
  `;
}

export default Component(App);
