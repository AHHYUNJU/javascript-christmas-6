import { Console } from '@woowacourse/mission-utils';
import { askDate, askMenu } from "../src/InputView.js";
import { MESSAGE } from "../src/message.js";
import { showEvent } from "../src/orders.js";


class App {
  async run() {
    const date = await askDate();
    const orders = await askMenu();
    showEvent(orders);
  }
}
const app = new App();
app.run();

  export default App;