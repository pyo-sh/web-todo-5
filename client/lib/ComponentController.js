import { createElementByHTML, replaceElement } from "@client/lib/ElementController";

export default class ComponentController {
  $element;
  children;
  props;
  state;

  constructor(FunctionalComponent, ...props) {
    this.component = FunctionalComponent;
    this.children = [];
    this.props = props;
    this.state = {};

    const html = FunctionalComponent.apply(this, props);
    this.$element = createElementByHTML(html);

    this._render();
    return this;
  }

  ComponentWillMount() {}
  ComponentDidMount() {}
  _ComponentChildMount() {
    const { $element, children } = this;
    const childElements = [...$element.getElementsByTagName("child")];
    childElements.forEach(($oldElement, i) => {
      const $newElement = children[i].object.$element;
      replaceElement($newElement, $oldElement);
    });
  }
  _render() {
    this.ComponentWillMount();

    this.children = [];
    const innerHTML = this.component.apply(this);
    const $newElement = createElementByHTML(innerHTML);

    if ($newElement) replaceElement($newElement, this.$element);
    this.$element = $newElement;

    this._ComponentChildMount();
    this.ComponentDidMount();
  }
}
