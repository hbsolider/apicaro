import getOnlineList from './getOnlineList';
import chatWorld from './chat/chatWorld';
import chatRoom from './chat/chatRoom';
import getRoomList from './getRoomList';

const initSockets = (io) => {
  getOnlineList(io);
  chatWorld(io);
  chatRoom(io);
  getRoomList(io);
};

export default initSockets;
