import { onlineUserList, roomList, gameList } from './storage';
import Game from './storage/Game';

const inGame = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-create-game', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.getById(user.inRoom);
      roomPanel.updateStatus('PLAYING');
      const gameInfo = gameList.add(roomPanel);
      io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
      io.to(user.inRoom).emit('server-game-info', { gameInfo });
    });

    socket.on('client-update-game-info', ({ gameId, type }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const gameInfo = gameList.getById(gameId);

      // switch (type) {
      //   case 'switch-turn':
      //     gameInfo.switchTurn();
      // }
      // io.to(user.inRoom).emit('server-game-info', { gameInfo });
    });
  });
};

export default inGame;
