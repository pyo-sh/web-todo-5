function Header(params) {
  const $element = document.createElement("header");

  Object.entries(params).forEach(([key, value]) => {
    if (key === "children") return;
    console.log(key);
    if (key.slice(0, 2) === "on") return $element.addEventListener(key.slice(2), value);
    $element[key] = value;
  });

  const { children } = params;
  console.log(children);
  children.forEach(($c) => {
    if (typeof $c === "string") $element.insertAdjacentHTML("beforeend", $c);
    $element.appendChild($c);
  });

  return $element;
}

export default Header;
