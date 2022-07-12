import "@client/index.scss";
import Header from "@client/component/Header.js";

(function () {
  document.body.appendChild(
    Header({
      children: [`<div>hi</div>`],
    }),
  );
})();
