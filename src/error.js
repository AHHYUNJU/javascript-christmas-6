import { ERROR_MESSAGE } from "../src/message.js";
import { MENU } from "../src/menu.js";

export function validateDate(date) {
  if (isNaN(date)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  const numericDate = Number(date);
  if (!Number.isInteger(numericDate)) throw new Error(ERROR_MESSAGE.NOT_INTEGER);
  if (numericDate < 1 || numericDate > 31) throw new Error(ERROR_MESSAGE.INVALID_RANGE);
}

export function validateMenu(orders) {
  validateOrdersStructure(orders);
  validateOrdersContent(orders);
  validateTotalQuantity(orders);
  validateNonBeverageIncluded(orders);
}

function validateOrdersStructure(orders) {
  if (!Array.isArray(orders) || orders.length === 0) {
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  }

  orders.forEach(order => {
    if (!order.name || typeof order.quantity === 'undefined') {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  });
}

function validateOrdersContent(orders) {
  const seen = new Set();

  orders.forEach(order => {
    const { name, quantity } = order;

    if (!isMenuAvailable(name)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }

    if (seen.has(name)) {
      throw new Error("[ERROR] 중복된 주문입니다. 다시 입력해 주세요.");
    }
    seen.add(name);
  });
}

function validateTotalQuantity(orders) {
  const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);

  if (totalQuantity > 20) {
    throw new Error("[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.");
  }
}

function validateNonBeverageIncluded(orders) {
  const hasNonBeverage = orders.some(order => !isBeverage(order.name));
  if (!hasNonBeverage) {
    throw new Error("[ERROR] 음료만 주문 시, 주문할 수 없습니다.");
  }
}

function isMenuAvailable(name) {
  return Object.values(MENU).some(category =>
    category.some(item => item.name === name)
  );
}


function isBeverage(name) {
  return MENU.음료.some(item => item.name === name);
}
