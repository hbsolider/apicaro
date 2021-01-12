import { onlineUserList, roomList, gameList } from './storage';
import Game from './storage/Game';

const inGame = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-create-game', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.getById(user.inRoom);
      roomPanel.updateStatus('PLAYING');
      const isAddGameSuccess = gameList.add(roomPanel);
      const gameInfo = gameList.getByRoomId(roomPanel.id);
      if (isAddGameSuccess) {
        io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
        io.to(user.inRoom).emit('server-game-info', { gameInfo });
      }
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

    socket.on('client-request-draw', ({ gameId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const gameInfo = gameList.getById(gameId);
      const rival = gameInfo.getRival(user);
      rival.sockets?.forEach((socketId) =>
        io
          .to(socketId)
          .emit('server-confirm-request-draw', { requestedUser: user })
      );
    });

    socket.on('client-refuse-request-draw', ({ gameId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const gameInfo = gameList.getById(gameId);
      const rival = gameInfo.getRival(user);
      rival.sockets?.forEach((socketId) =>
        io
          .to(socketId)
          .emit('server-confirm-refuse-request-draw', { answerUser: user })
      );
    });

    socket.on('client-accept-request-draw', ({ gameId }) => {
      // TODO: Xử lý hòa
    });

    socket.on('client-surrender', ({ gameId }) => {
      // TODO: Xử lý thua
    });
  });
};

export default inGame;
