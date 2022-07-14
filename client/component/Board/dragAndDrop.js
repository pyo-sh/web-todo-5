const init = () => {
  const $cardList = document.querySelector(".cardList-list");
  $cardList.addEventListener("mousedown", (event) => {
    const $cardItem = event.target.closest(".cardItem");
    if (!$cardItem) return;

    // $target과 마우스의 x, y차이
    let shiftX = event.clientX - $cardItem.getBoundingClientRect().left;
    let shiftY = event.clientY - $cardItem.getBoundingClientRect().top;

    // (1) absolute 속성과 zIndex 프로퍼티를 수정해 공이 제일 위에서 움직이기 위한 준비를 합니다.
    // 움직일 때, 다른 요소에는 영향 주지 않게 하려면 위치를 절대적으로 설정해줘야한다.
    // $target.style.position = "absolute";

    $cardItem.style.position = "absolute";
    $cardItem.style.zIndex = 1000;

    // 현재 위치한 부모에서 body로 직접 이동하여
    // body를 기준으로 위치를 지정합니다.
    document.body.append($cardItem);

    // 공을 pageX, pageY 좌표 중앙에 위치하게 합니다.
    function moveAt(pageX, pageY) {
      // 공의 위치를 이동
      // $target ? 공
      $cardItem.style.left = pageX - shiftX + "px";
      $cardItem.style.top = pageY - shiftY + "px";
    }

    // 포인터 아래로 공을 이동시킵니다.
    moveAt(event.pageX, event.pageY);

    // 즉시 날아가는 잠재적 드롭 가능한 요소
    let currentDroppable = null;

    function onMouseMove(event) {
      // 문서를 기준으로, 이벤트가 발생한 x, y의 위치
      moveAt(event.pageX, event.pageY);
      $cardItem.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      $cardItem.hidden = false;

      // 마우스 이벤트는 윈도우 밖으로 트리거 될 수 없습니다.(공을 윈도우 밖으로 드래그 했을 때)
      // clientX∙clientY가 윈도우 밖에 있으면, elementFromPoint는 null을 반환합니다.
      if (!elemBelow) return;
      // 잠재적으로 드롭 할 수 있는 요소를 'droppable' 클래스로 지정합니다.(다른 로직 가능)
      let droppableBelow = elemBelow.closest(".droppable");

      if (currentDroppable != droppableBelow) {
        // 이동하긴 함!
        // out
        if (currentDroppable) {
          const $droppable = document.querySelector(".droppable");
          $droppable.style.border = "5px solid black";
          console.log("leave...");
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          const $droppable = document.querySelector(".droppable");
          $droppable.style.border = "5px solid pink";
          console.log("in...");
        }
      } else {
        // 이동위치 = 기존 위치
      }
    }

    // (2) mousemove로 공을 움직입니다.
    document.addEventListener("mousemove", onMouseMove);

    // (3) 공을 드롭하고, 불필요한 핸들러를 제거합니다.
    $cardItem.onmouseup = function () {
      $cardItem.style.position = "";
      document.removeEventListener("mousemove", onMouseMove);
      $cardItem.onmouseup = null;
    };
  });
};

module.exports = { init };
