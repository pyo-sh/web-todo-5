import "@client/component/Board/CardList.scss";
import CardItem from "@client/component/Board/CardItem";
import CardActive from "@client/component/Board/CardActive";
import { requestDeleteCard } from "@client/api/card";

let isWaiting = false;
let isClicked = false;
let $dragging = null;

export default class CardList {
  constructor($target, board) {
    this.$target = $target;
    this.state = board;
    this.render();
  }
  init() {
    const { $cardList, cardItems, state } = this;
    const render = this.render.bind(this);

    $cardList.addEventListener("mousedown", (event) => {
      const $cardItem = event.target.closest(".cardItem");
      if (!$cardItem) return;

      const $deleteButton = event.target.closest("#cardItem-delete");
      if ($deleteButton) {
        const index = $cardItem.getAttribute("data-index");
        const { id, title, author } = cardItems[index]?.state;
        const { title: boardName } = state;
        requestDeleteCard(id, title, author, boardName).then(({ message }) => {
          if (!message) return;
          state.cards = state.cards.filter(({ id: cardID }) => cardID !== id);
          render();
        });
        return;
      }

      if (isClicked) return;

      // 클릭했을 때 $target과 마우스의 x, y차이
      const { left, top } = $cardItem.getBoundingClientRect();
      let shiftX = event.clientX - left;
      let shiftY = event.clientY - top;

      // 움직일 때, 다른 요소에는 영향 주지 않게 하려면 위치를 절대적으로 설정해줘야한다.
      const $shadow = $cardItem.cloneNode(true);
      $shadow.classList.add("cardItem-shadow");
      $cardItem.insertAdjacentElement("beforebegin", $shadow);
      $cardItem.style.position = "absolute";
      $cardItem.style.zIndex = 1000;

      // 공을 pageX, pageY 좌표 중앙에 위치하게 합니다.
      function moveAt(pageX, pageY) {
        $cardItem.style.left = pageX - shiftX + "px";
        $cardItem.style.top = pageY - shiftY + "px";
      }

      // 포인터 아래로 공을 이동시킵니다.
      moveAt(event.pageX, event.pageY);

      $dragging = $cardItem;
      let $currentBelow = null;
      const onMouseMove = (event) => {
        // 문서를 기준으로, 이벤트가 발생한 x, y의 위치
        moveAt(event.pageX, event.pageY);
        // 여기는 스타일 조정 구간입니다.
        // clientX∙clientY가 윈도우 밖에 있으면, elementFromPoint는 null을 반환합니다.
        $cardItem.style.display = "none";
        let $elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        $cardItem.style.display = "";
        $currentBelow = $elemBelow.closest(".cardList-list");
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

        let index = 0;
        const listItems = [...$currentBelow.children].filter((item) =>
          item.classList.contains("cardItem"),
        );
        listItems.some((list, i) => {
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
    const { state } = this;
    const { title, cards } = state;
    const render = this.render.bind(this);

    const $newListWrapper = document.createElement("div");
    $newListWrapper.className = "cardList";
    $newListWrapper.innerHTML = `
      <section class="cardList-header text-undraggable">
        <article class="cardList-strengther">
          <h2 class="cardList-title">${title}</h2>
          <div class="cardList-count">${cards.length}</div>
        </article>
        <button class="plus-button hover-blue"></button>
        <button class="x-button hover-red"></button>
      </section>
    `;

    if (this.$listWrapper) {
      this.$target.replaceChild($newListWrapper, this.$listWrapper);
      this.$listWrapper?.remove();
    } else this.$target.appendChild($newListWrapper);
    this.$listWrapper = $newListWrapper;

    this.$cardList = document.createElement("ul");
    this.$cardList.className = "cardList-list";
    this.$listWrapper.appendChild(this.$cardList);

    const $cardList = this.$cardList;
    this.cardItems = this.state.cards.map((card, index) => {
      return new CardItem($cardList, { ...card, index });
    });
    this.init();
  }
}
