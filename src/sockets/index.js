import getOnlineList from './getOnlineList';
import chatWorld from './chat/chatWorld';
import chatRoom from './chatRoom';
import getRoomList from './getRoomList';
import getRankList from './getRankList';
import game from './game';

const initSockets = (io) => {
  getRoomList(io);
  getOnlineList(io);
  // chatWorld(io);
  chatRoom(io);
  getRankList(io);
  // game(io);
};

export default initSockets;
