import { gameService } from 'service';
import { pick } from 'utils/common';
import Game from './Game';
class GameList {
  constructor() {
    if (GameList.instance) {
      return GameList.instance;
    }
    GameList.instance = this;
    this.games = {};
  }

  getAll() {
    return this.games;
  }

  getById(gameId) {
    return this.games[gameId] ?? {};
  }

  getByRoomId(roomId) {
    return Object.values(this.games).find((item) => item.idRoom === roomId);
  }

  add(roomPanel) {
    const existedGame = this.getByRoomId(roomPanel.id);
    if (existedGame) return false;

    const newGame = new Game(roomPanel);
    this.games[newGame.id] = newGame;
    gameService.createOne(newGame);
    return true;
  }

  remove(gameId) {
    if (this.games[gameId]) delete this.games[gameId];
  }

  transform(keys) {
    return Object.values(this.games).map((game) => pick(game, keys));
  }
}

export default GameList;
