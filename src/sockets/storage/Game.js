import { checkEndGame } from 'sockets/game/winOrLose';
import { v4 as uuidv4 } from 'uuid';
import { changeTo2D } from '../game/winOrLose';
import gameService from 'service/game.service';
import Steps from 'service/step.service';
import calPointGet from 'utils/calPointGet';
import userService from 'service/user.service';

class Game {
  constructor({ id, firstPlayer, secondPlayer, timePerStep, firstStep }) {
    this.id = uuidv4();
    this.idRoom = id;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.timePerStep = timePerStep;
    this.turn = firstStep;
    this.timeLeft = timePerStep;
    this.board = Array(20 * 20).fill('');
    this.userWin = null;
    this.completeAt = null;
    this.currentPosition = null;
    // this.interval = setInterval(() => {
    //   this.timeLeft -= 1;
    //   if (this.timeLeft===0) {
    //     return;
    //   }
    // }, 1000);
    this.interval = null;
  }
  updateWinnerNull() {
    this.userWin = null;
  }
  winnerTimeOut() {
    if (this.timeLeft === 0) {
      this.userWin = this.secondPlayer.id;
    } else {
      this.userWin = this.firstPlayer.id;
    }
    this.gameEnd();
    clearInterval(this.interval);
    return this;
  }
  updateLoser(loserId) {
    if (this.firstPlayer.id === loserId) {
      this.userWin = this.secondPlayer.id;
    } else if (this.secondPlayer.id === loserId) {
      this.userWin = this.firstPlayer.id;
    }
    this.gameEnd();
    clearInterval(this.interval);
    return this;
  }
  gameEnd() {
    this.completeAt = Date.now();
    this.timeLeft = this.timePerStep;
    clearInterval(this.interval);
    gameService.updateGame(this);
    const winPlayer = this.whoWin();
    const losePlayer = this.whoLose();
    const pointGet = calPointGet(winPlayer.point, losePlayer.point);
    userService.updatePoint({
      ...winPlayer,
      point: winPlayer.point + pointGet,
    });
    userService.updatePoint({
      ...losePlayer,
      point: losePlayer.point - pointGet,
    });
    return this;
  }

  gameDraw() {
    this.completeAt = Date.now();
    this.board.join();
    this.timeLeft = this.timePerStep;
    this.userWin = null;
    clearInterval(this.interval);
    gameService.updateGame(this);
    return this;
  }

  resetGame() {
    this.board = Array(20 * 20).fill('');
    this.userWin = null;
    return this.board;
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

  async chessAtPosition({ position, userId }) {
    let winArray = [];
    if (this.board[position] === '') {
      if (
        this.turn === 1 &&
        userId === this.firstPlayer?.id &&
        this.userWin === null
      ) {
        this.board[position] = 'x';
        this.currentPosition = position;
        const { status, winArr } = this.checkWinner(position);
        if (status) {
          winArray = new Set(winArr);
          this.userWin = userId;
          this.gameEnd();
          this.switchTurn();
        }
        let board = this.board.join(', ');
        await Steps.create({
          userId: this.firstPlayer.id,
          gameId: this.id,
          board,
        });
        this.switchTurn();
      } else if (
        this.turn === 0 &&
        userId === this.secondPlayer?.id &&
        this.userWin === null
      ) {
        this.board[position] = 'o';
        this.currentPosition = position;
        const { status, winArr } = this.checkWinner(position);
        if (status) {
          winArray = new Set(winArr);
          this.userWin = userId;
          this.gameEnd();
          this.switchTurn();
        }
        let board = this.board.join(', ');
        await Steps.create({
          userId: this.secondPlayer.id,
          gameId: this.id,
          board,
        });
        this.switchTurn();
      }
    }

    const a = {
      winner: this.whoWin(),
      boardData: this.board,
      winArray,
      turn: this.turn,
      currentPosition: this.currentPosition,
    };
    return a;
  }

  whoWin() {
    if (this.userWin === this.firstPlayer.id) {
      return this.firstPlayer;
    } else if (this.userWin === this.secondPlayer.id) {
      return this.secondPlayer;
    } else {
      return this.userWin;
    }
  }

  whoLose() {
    if (this.userWin === this.firstPlayer.id) {
      return this.secondPlayer;
    } else if (this.userWin === this.secondPlayer.id) {
      return this.firstPlayer;
    }
  }

  decreaseTime() {
    if (this.timeLeft === 0) {
      this.gameOver();
    }
    if (this.timeLeft > 0) {
      this.timeLeft = this.timeLeft - 1;
    }
    return this;
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
