import "@client/index.scss";
import App from "./App";

(function () {
  const obj = { children: [] };
  App.call(obj);
  document.body.appendChild(obj.children[0].object.$element);
})();
