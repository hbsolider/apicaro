import { checkEndGame } from 'sockets/game/winOrLose';
import { v4 as uuidv4 } from 'uuid';
import { changeTo2D } from '../game/winOrLose';
class Game {
  constructor({ id, firstPlayer, secondPlayer, timePerStep, firstStep }) {
    this.id = uuidv4();
    this.idRoom = id;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.timePerStep = timePerStep;
    this.turn = firstStep;
    this.timeLeft = timePerStep;
    this.board = Array(20 * 20).fill(null);
    this.userWin = null;
    this.completeAt = null;
    this.currentPosition = null;
  }

  setFirstPlayer(firstPlayer) {
    this.firstPlayer = firstPlayer;
  }

  setSecondPlayer(secondPlayer) {
    this.secondPlayer = secondPlayer;
  }

  switchTurn() {
    this.timeLeft = this.timePerStep;
    if (this.turn === 0) this.turn = 1;
    else this.turn = 0;
  }

  getGameBoard() {
    return this.board;
  }

  resetGame() {
    this.board = Array(20 * 20).fill(null);
    this.userWin = null;
    return this.board;
  }

  checkWinner(position) {
    const y = Math.floor(position / 20);
    const x = position % 20;
    const temp = [...this.board];
    const array2d = changeTo2D(temp);
    const { status, winArr } = checkEndGame(array2d, y, x);
    return {
      status,
      winArr,
    };
  }

  chessAtPosition({ position, userId }) {
    let winArray = [];
    if (this.board[position] === null) {
      if (
        this.turn === 1 &&
        userId === this.firstPlayer?.id &&
        this.userWin === null
      ) {
        this.board[position] = 'o';
        this.currentPosition = position;
        const { status, winArr } = this.checkWinner(position);
        if (status) {
          winArray = new Set(winArr);
          this.userWin = userId;
        }
        this.switchTurn();
      } else if (
        this.turn === 0 &&
        userId === this.secondPlayer?.id &&
        this.userWin === null
      ) {
        this.board[position] = 'x';
        this.currentPosition = position;
        const { status, winArr } = this.checkWinner(position);
        if (status) {
          winArray = new Set(winArr);
          this.userWin = userId;
        }
        this.switchTurn();
      }
    }
    const a = {
      winner: this.userWin,
      boardData: this.board,
      winArray,
      turn: this.turn,
    };
    return a;
  }

  decreaseTime() {
    if (this.timeLeft === 0) {
      this.gameOver();
    }
    if (this.timeLeft > 0) {
      this.timeLeft = this.timeLeft - 1;
    }
    return this.timeLeft;
  }

  requestDraw(user) {
    if (user.id === this.firstPlayer.id) {
    }
    if (user.id === this.firstPlayer.id) {
    }
  }

  getRival(user) {
    if (user.id === this.firstPlayer.id) {
      return this.secondPlayer;
    }
    return this.firstPlayer;
  }

  gameOver() {
    this.timeLeft = this.timePerStep;
    if (this.turn) {
      return this.firstPlayer;
    } else {
      return this.secondPlayer;
    }
  }
}

export default Game;
