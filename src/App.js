import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.reandomNumber = this.generateRandomNumber();
  }

  async play() {
    console.log("숫자 야구 게임을 시작합니다");
    await this.generateRandomNumber();
  }

  generateRandomNumber() {
    const computerNumber = [];
    while (computerNumber.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computerNumber.includes(number)) {
        computerNumber.push(number);
      }
    }
    console.log(computerNumber);
    return computerNumber.join("");
  }
}

export default App;
