import game from 'database/models/game';
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
    setInterval(() => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      if (user) {
        const game = gameList.getByRoomId(user.inRoom);
        if (game) io.to(user.inRoom).emit('decrease-time', game.decreaseTime());
      }
    }, 1000);
    socket.on('client-switch-turn', ({ gameId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const gameInfo = gameList.getById(gameId);

      // switch (type) {
      //   case 'switch-turn':
      //     gameInfo.switchTurn();
      // }
      // io.to(user.inRoom).emit('server-game-info', { gameInfo });
    });

    socket.on('client-play-chess', ({ position, roomId }) => {
      const currentRoom = roomList.getById(roomId);
      const currentGame = gameList.getByRoomId(roomId);
      if (currentRoom) {
        const currentPlayer = onlineUserList.getUserBySocketId(socket.id);
        const {
          winner,
          boardData,
          winArray,
          turn,
        } = currentGame.chessAtPosition({
          position,
          userId: currentPlayer?.id,
        });
        if (winner) {
          io.to(roomId).emit('server-send-winner', {
            winner,
            boardData,
            winArray: [...winArray],
            turn,
          });
        } else {
          io.to(roomId).emit('server-game-info', {
            gameInfo: { board: boardData, turn },
          });
        }
      }
    });

    socket.on('reset-game', (roomId) => {
      const game = gameList.getAll();
      const currentGame = gameList.getByRoomId(roomId);
      const board = currentGame.resetGame();
      io.to(roomId).emit('reset-game', board);
    });
    socket.on('client-request-draw', ({ gameId }) => {
      console.log('gameId', gameId);
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
