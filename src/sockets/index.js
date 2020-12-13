import getOnlineList from './getOnlineList';
import chat from './chat';

const initSockets = (io) => {
  getOnlineList(io);
  chat(io);
};

export default initSockets;
