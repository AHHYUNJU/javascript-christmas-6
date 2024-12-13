import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from "../src/message.js";
import { validateDate, validateMenu } from "../src/error.js"; 

export async function askDate() {
  while (true) {
    try {
      const input = await Console.readLineAsync(MESSAGE.ASK_DATE + "\n");
      validateDate(input);
      return input; 
    } catch (error) {
      Console.print(error.message); 
    }
  }
}

export async function askMenu() {
  while (true) {
    try {
      const input = await Console.readLineAsync(MESSAGE.ASK_MENU + "\n");
      const orders = input.split(",").map(order => {
        const [name, quantity] = order.split("-");
        return { name, quantity: Number(quantity) };
      });
      Console.print(orders)
      validateMenu(orders);
      return orders; 
    } catch (error) {
      Console.print(error.message); 
    }
  }
}
