import "@client/component/Board/CardList.scss";
import CardItem from "@client/component/Board/CardItem";
import CardActive from "@client/component/Board/CardActive";

let $dragging = null;

export default class CardList {
  constructor($target, board) {
    this.$target = $target;
    this.state = board;
    this.render();
    this.init();
  }
  init() {
    let $parent = this.$target;
    const $cardList = this.$cardList;
    $cardList.addEventListener("mousedown", (event) => {
      const $cardItem = event.target.closest(".cardItem");
      if (!$cardItem) return;

      // 클릭했을 때 $target과 마우스의 x, y차이
      const { left, top } = $cardItem.getBoundingClientRect();
      let shiftX = event.clientX - left;
      let shiftY = event.clientY - top;

      // 움직일 때, 다른 요소에는 영향 주지 않게 하려면 위치를 절대적으로 설정해줘야한다.
      const $shadow = $cardItem.cloneNode(true);
      $cardItem.insertAdjacentElement("beforebegin", $shadow);
      $cardItem.style.position = "absolute";
      $cardItem.style.zIndex = 1000;

      // 현재 위치한 부모에서 body로 직접 이동하여
      // body를 기준으로 위치를 지정합니다.
      // document.body.append($cardItem);

      // 공을 pageX, pageY 좌표 중앙에 위치하게 합니다.
      function moveAt(pageX, pageY) {
        $cardItem.style.left = pageX - shiftX + "px";
        $cardItem.style.top = pageY - shiftY + "px";
      }

      // 포인터 아래로 공을 이동시킵니다.
      moveAt(event.pageX, event.pageY);

      $dragging = $cardItem;
      let $currentBelow = null;
      let currentDroppable = null;
      const onMouseMove = (event) => {
        // 문서를 기준으로, 이벤트가 발생한 x, y의 위치
        moveAt(event.pageX, event.pageY);
        // 여기는 스타일 조정 구간입니다.
        // 마우스 이벤트는 윈도우 밖으로 트리거 될 수 없습니다.(공을 윈도우 밖으로 드래그 했을 때)
        // clientX∙clientY가 윈도우 밖에 있으면, elementFromPoint는 null을 반환합니다.
        // 잠재적으로 드롭 할 수 있는 요소를 'droppable' 클래스로 지정합니다.(다른 로직 가능)
        $cardItem.style.display = "none";
        let $elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        $cardItem.style.display = "";
        $currentBelow = $elemBelow.closest(".cardList-list");

        if (!$elemBelow) return;

        // let droppableBelow = $elemBelow.closest(".cardList-list");

        // if (currentDroppable != droppableBelow) {
        //   if (currentDroppable) {
        //     const $droppable = document.querySelector(".droppable");
        //     $droppable.style.border = "5px solid black";
        //     console.log("leave...");
        //   }
        //   currentDroppable = droppableBelow;
        //   if (currentDroppable) {
        //     const $droppable = document.querySelector(".droppable");
        //     $droppable.style.border = "5px solid pink";
        //     console.log("in...");
        //   }
        // } else {
        //   // 이동위치 = 기존 위치
        // }
      };

      // (2) mousemove로 공을 움직입니다.
      document.addEventListener("mousemove", onMouseMove);

      // (3) 공을 드롭하고, 불필요한 핸들러를 제거합니다.
      $cardItem.onmouseup = function (event) {
        $cardItem.style.position = "";
        document.removeEventListener("mousemove", onMouseMove);
        $cardItem.onmouseup = null;
        $shadow.remove();

        const { y: mouseY } = event;
        if (!$currentBelow) $currentBelow = $cardList;

        const listItems = [...$currentBelow.children].filter((item) =>
          item.classList.contains("cardItem"),
        );
        listItems.some((list) => {
          const { y, height } = list.getBoundingClientRect();
          const listCenterY = y + height / 2;

          if (mouseY < listCenterY) {
            list.insertAdjacentElement("beforebegin", $dragging);
            $dragging = null;
          }

          return !$dragging;
        });

        if ($dragging) {
          $currentBelow.appendChild($dragging);
          $dragging = null;
        }
      };
    });

    this.$listWrapper.addEventListener("click", (event) => {
      const $plusButton = event.target.closest(".plus-button");
      if (!$plusButton) return;

      new CardActive(this.$cardList, {
        board: this.state,
        // onClickCreateCard: ({ id, cardTitle, content, boardTitle, boardId, author }) => {
        //   const newCards = [...cards, { id, title: cardTitle, content, author, board: boardId }];
        //   const newBoard = { ...this.state, cards: newCards };
        //   this.setState(newBoards);
        // },
      });
    });
  }

  render() {
    const { title, cards } = this.state;

    this.$listWrapper?.remove();
    this.$listWrapper = document.createElement("div");
    this.$listWrapper.className = "cardList";
    this.$listWrapper.innerHTML = `
      <section class="cardList-header text-undraggable">
        <article class="cardList-strengther">
          <h2 class="cardList-title">${title}</h2>
          <div class="cardList-count">${cards.length}</div>
        </article>
        <button class="plus-button hover-blue"></button>
        <button class="x-button hover-red"></button>
      </section>
    `;
    this.$target.appendChild(this.$listWrapper);

    this.$cardList = document.createElement("ul");
    this.$cardList.className = "cardList-list";
    this.$listWrapper.appendChild(this.$cardList);

    const $cardList = this.$cardList;
    this.cardItems = this.state.cards.map((card) => {
      return new CardItem($cardList, card);
    });
  }
}
