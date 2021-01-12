import getOnlineList from './getOnlineList';
import chatRoom from './chatRoom';
import getRoomList from './getRoomList';
import getRankList from './getRankList';
import inRoom from './inRoom';
import matchingGame from './matchingGame';
import inGame from './inGame';
import inHistory from './inHistory';

const initSockets = (io) => {
  matchingGame(io);
  getRoomList(io);
  getOnlineList(io);
  chatRoom(io);
  getRankList(io);
  inRoom(io);
  inGame(io);
  inHistory(io);
};

export default initSockets;
