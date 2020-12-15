import getOnlineList from './getOnlineList';
import chatWorld from './chat/chatWorld';
import chatRoom from './chat/chatRoom';
import game from './game';
const initSockets = (io) => {
  getOnlineList(io);
  chatWorld(io);
  chatRoom(io);
  game(io);
};

export default initSockets;
