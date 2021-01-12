import { v4 as uuidv4 } from 'uuid';
class Game {
  constructor({ id, firstPlayer, secondPlayer, timePerStep, firstStep }) {
    this.id = uuidv4();
    this.idRoom = id;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.timePerStep = timePerStep;
    this.turn = firstStep;
    this.timeLeft = timePerStep;
    this.board = [];
    this.userWin = null;
    this.completeAt = null;
  }

  switchTurn() {
    if (this.turn === 0) this.turn = 1;
    else this.turn = 0;
    return this;
  }
}

export default Game;
