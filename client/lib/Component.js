import ComponentController from "@client/lib/ComponentController";

const Component = (함수컴포넌트) => {
  // 실행시 <child> 를 뱉는 함수
  return function connectClass(...params) {
    // 함수를 클래스로 변환한다
    const 컴포넌트클래스 = new ComponentController(함수컴포넌트, ...params);
    // 상위 클래스의 자식에 자신을 집어넣는다
    this.children.push({ object: 컴포넌트클래스, props });
    // 태그 변환을 위해 string 반환한다.
    return `<child></child>`;
  };
};

export default Component;
