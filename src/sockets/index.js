import getOnlineList from './getOnlineList';
import chatWorld from './chat/chatWorld';
import chatRoom from './chat/chatRoom';

const initSockets = (io) => {
  getOnlineList(io);
  chatWorld(io);
  chatRoom(io);
};

export default initSockets;
