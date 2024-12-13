import { ERROR_MESSAGE } from "../src/message.js";
import { MENU } from "../src/menu.js";
import { Console } from '@woowacourse/mission-utils';

export function validateDate(date){
  if (isNaN(date)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  if (!Number.isInteger(Number(date))) throw new Error(ERROR_MESSAGE.NOT_INTEGER);
  if (date < 1 || date > 31) throw new Error(ERROR_MESSAGE.INVALID_RANGE);
}

export function validateMenu(orders) {
  orders.forEach(order => {
    if (!order.name || !order.quantity) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);}});
  if (orders.every(order => !isMenuAvailable(order.name))) {throw new Error(ERROR_MESSAGE.INVALID_ORDER);}
  orders.forEach(order => {
    if (!Number.isInteger(order.quantity) || order.quantity <= 0) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  });
  if (Number(orders.quantity) <= 0) throw new Error(ERROR_MESSAGE.INVALID_ORDER);

  const seen = new Set();

  orders.forEach(order => {
    const { name } = order;
    if (seen.has(name)) {
      throw new Error("[ERROR] 중복된 주문입니다. 다시 입력해 주세요.");
    }
    seen.add(name); 
  });


  let totalQuantity = 0;
  let hasNonBeverage = false;


    // 총 수량 계산
    totalQuantity += quantity;

    // 음료 외 메뉴 확인
    if (!isBeverage(name)) {
      hasNonBeverage = true;
    }
  };

  // 음료만 주문했는지 확인
  if (!hasNonBeverage) {
    throw new Error("[ERROR] 음료만 주문 시, 주문할 수 없습니다.");
  }

  // 총 수량 제한 확인
  if (totalQuantity > 20) {
    throw new Error("[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.");
  }


function isMenuAvailable(name) {
  return Object.values(MENU).some(category =>
    category.some(item => item.name === name)
  );
}

function isBeverage(name) {
  return MENU.음료.some(item => item.name === name);

}

function isMenuAvailable(name) {
  return Object.values(MENU).some(category =>
    category.some(item => item.name === name)
  );
}
