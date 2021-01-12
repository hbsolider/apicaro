import { onlineUserList, roomList } from './storage';
import { gameService } from 'service';

const inHistory = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-get-history', async ({ gameId }) => {
      const gameInfo = await gameService.getOneById(gameId);
      socket.emit('server-send-game-history', { gameInfo });
    });
  });
};

export default inHistory;
