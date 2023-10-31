import { MissionUtils, Console } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.reandomNumber = null;
  }
  // 1. 게임 시작
  async play() {
    console.log("숫자 야구 게임을 시작합니다");
    await this.gameStart();
  }

  // 2. 정답 생성과 힌트 제공
  async gameStart() {
    this.correctNumber = this.generateRandomNumber();
    this.judgment();
  }

  async judgment() {
    //입력 받고 검사하고 힌트 출력하기
    const userAnswer = await Console.readLineAsync();
    const validatedUserAnswer = this.validation(userAnswer);
    console.log(validatedUserAnswer);
    this.hintMessage(this.compare(validatedUserAnswer));
  }

  hintMessage({ strike, ball }) {
    let message = "";
    if (ball > 0) message += `${ball}볼 `;
    if (ball > 0 && strike > 0) message += `${ball}볼 ${strike}스트라이크`;
    if (strike > 0) message += `${strike}스트라이크`;
    return console.log(message);
  }

  compare(validatedUserAnswer) {
    let strike = 0;
    let ball = 0;
    let out = true;

    for (let i = 0; i < 3; i++) {
      if (this.correctNumber[i] === validatedUserAnswer[i]) {
        strike += 1;
      } else if (this.correctNumber.includes(validatedUserAnswer[i])) {
        ball += 1;
      } else {
        return out;
      }
    }
    return { strike, ball, out };
  }

  validation(userAnswer) {
    const regex = /^[1-9]{3}$/;
    if (regex.test(userAnswer) && new Set(userAnswer).size === 3) {
      return userAnswer;
    } else {
      Console.print(`올바른 입력이 아닙니다. 서로 다른 3자리 숫자를 입력하세요: ${userAnswer}`);
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }
  }

  generateRandomNumber() {
    const computerNumber = [];
    while (computerNumber.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computerNumber.includes(number)) {
        computerNumber.push(number);
      }
    }
    console.log(computerNumber.join(""));
    return computerNumber.join("");
  }
}

export default App;
