import { Console } from '@woowacourse/mission-utils';
import { askDate, askMenu } from "../src/InputView.js";
import { MESSAGE } from "../src/message.js";

class App {
  async run() {
    const date = await askDate();
    const menu = await askMenu();
    Console.print(date);
    Console.print(menu);
  }
}
const app = new App();
app.run();

  export default App;