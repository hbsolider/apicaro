class Game {
  constructor({ id, firstPlayer, secondPlayer, timePerStep, turn }) {
    this.id = id;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.turn = turn;
    this.timePerStep = timePerStep || 30;
  }
}

export default Game;
