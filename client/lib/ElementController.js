export const createElementByHTML = (html) => {
  const $virtualParent = document.createElement("temp");
  $virtualParent.insertAdjacentHTML("beforeend", html);
  return $virtualParent.firstElementChild;
};

export const replaceElement = ($newElement, $oldElement) => {
  const $parent = $oldElement.parentNode;
  if ($parent && $newElement) $parent.replaceChild($newElement, $oldElement);
  $oldElement.remove();
};
