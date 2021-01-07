import getOnlineList from './getOnlineList';
import chatWorld from './chat/chatWorld';
import chatRoom from './chat/chatRoom';
import getRoomList from './getRoomList';
import game from './game';

const initSockets = (io) => {
  getRoomList(io);
  getOnlineList(io);
  // chatWorld(io);
  // chatRoom(io);
  // game(io);
};

export default initSockets;
