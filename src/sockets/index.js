import getOnlineList from './getOnlineList';
import chat from './chat';
import game from './game';

const initSockets = (io) => {
  getOnlineList(io);
  chat(io);
  game(io);
};

export default initSockets;
