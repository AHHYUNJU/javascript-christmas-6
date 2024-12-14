import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from "../src/message.js";
import { MENU } from "../src/menu.js";

export function showEvent(orders){
  Console.print(MESSAGE.ORDER_MENU);
  orders.forEach(order => {Console.print(`${order.name} ${order.quantity}개`);});
  Console.print(MESSAGE.ORIGINAL_TOTAL);

  const totalAmount = orders.reduce((sum, order) => {
    const menuItem = findMenuItem(order.name); // 메뉴 정보 찾기
    if (menuItem) {return sum + menuItem.price * order.quantity;}
    return sum;}, 0);
    const formattedAmount = new Intl.NumberFormat('ko-KR').format(totalAmount);
    Console.print(`${formattedAmount}원`);
}

function findMenuItem(name) {
  return Object.values(MENU).flat().find(item => item.name === name);
}

/*
<주문 메뉴>
타파스 1개
제로콜라 1개

<할인 전 총주문 금액>
8,500원
 
<증정 메뉴>
없음
 
<혜택 내역>
없음
 
<총혜택 금액>
0원
 
<할인 후 예상 결제 금액>
8,500원
 
<12월 이벤트 배지>
없음
```

- 주문 메뉴의 출력 순서는 자유롭게 출력해 주세요.
- 총혜택 금액에 따라 이벤트 배지의 이름을 다르게 보여 주세요.
- 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격
- 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
- 증정 메뉴
  - 증정 이벤트에 해당하지 않는 경우, 증정 메뉴 "없음"으로 보여 주세요.
- 혜택 내역
  - 고객에게 적용된 이벤트 내역만 보여 주세요.
  - 적용된 이벤트가 하나도 없다면 혜택 내역 "없음"으로 보여 주세요.
  - 혜택 내역에 여러 개의 이벤트가 적용된 경우, 출력 순서는 자유롭게 출력해주세요.
- 이벤트 배지
  - 이벤트 배지가 부여되지 않는 경우, "없음"으로 보여 주세요.
- 적용된 이벤트가 하나도 없는 경우는 아래 예시를 참고해 주세요.


*/