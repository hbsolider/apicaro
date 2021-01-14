import { onlineUserList, roomList, gameList } from './storage';
import { USER_STATUS } from 'utils/constants';

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
        gameInfo.interval = setInterval(() => {
          console.log('hihiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
          const gameCurrent = gameInfo.decreaseTime();
          if (gameCurrent) {
            if (gameCurrent?.timeLeft === 0) {
              const first = onlineUserList.getUserById(
                gameCurrent.firstPlayer.id
              );
              const second = onlineUserList.getUserById(
                gameCurrent.secondPlayer.id
              );
              first.updateStatus(USER_STATUS.IN_ROOM);
              second.updateStatus(USER_STATUS.IN_ROOM);

              let game = gameCurrent.winnerTimeOut();
              if (game) {
                if (gameCurrent.turn === 0) {
                  io.to(gameCurrent?.idRoom).emit('server-game-info', {
                    gameInfo: {
                      ...game,
                      status: `${game.whoWin()?.name} win bruhhh`,
                    },
                  });
                } else {
                  io.to(gameCurrent?.idRoom).emit('server-game-info', {
                    gameInfo: {
                      ...game,
                      status: `${game.whoWin()?.name} win bruhhh`,
                    },
                  });
                }
              }
            }
            io.to(roomPanel.id).emit('server-game-info', { gameInfo });
          }
        }, 1000);
      }
    });

    socket.on('client-play-chess', async ({ position, roomId }) => {
      const currentRoom = roomList.getById(roomId);
      const currentGame = gameList.getByRoomId(roomId);
      if (currentRoom) {
        const currentPlayer = onlineUserList.getUserBySocketId(socket.id);
        const {
          winner,
          boardData,
          winArray,
          turn,
          currentPosition,
        } = await currentGame.chessAtPosition({
          position,
          userId: currentPlayer?.id,
        });
        if (winner) {
          io.to(roomId).emit('server-send-winner', {
            winner,
            boardData,
            winArray: [...winArray],
            turn,
            currentPosition,
          });
        } else {
          console.log('currentPosition', currentPosition);
          io.to(roomId).emit('server-game-info', {
            gameInfo: { board: boardData, turn, currentPosition },
          });
        }
      }
    });

    socket.on('reset-game', (roomId) => {
      const game = gameList.getByRoomId(roomId);
      gameList.remove(game.id);
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.getById(roomId);
      roomPanel.updateStatus('PLAYING');
      const isAddGameSuccess = gameList.add(roomPanel);
      const gameInfo = gameList.getByRoomId(roomPanel.id);
      if (isAddGameSuccess) {
        io.to(user.inRoom).emit('reset-game');
        // io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
        gameInfo.interval = setInterval(() => {
          const gameCurrent = gameInfo.decreaseTime();
          if (gameCurrent) {
            if (gameCurrent?.timeLeft === 0) {
              const first = onlineUserList.getUserById(
                gameCurrent.firstPlayer.id
              );
              const second = onlineUserList.getUserById(
                gameCurrent.secondPlayer.id
              );
              first.updateStatus(USER_STATUS.IN_ROOM);
              second.updateStatus(USER_STATUS.IN_ROOM);

              let game = gameCurrent.winnerTimeOut();
              if (game) {
                if (gameCurrent.turn === 0) {
                  io.to(gameCurrent?.idRoom).emit('server-game-info', {
                    gameInfo: {
                      ...game,
                      status: `${game.whoWin()?.name} win bruhhh`,
                    },
                  });
                } else {
                  io.to(gameCurrent?.idRoom).emit('server-game-info', {
                    gameInfo: {
                      ...game,
                      status: `${game.whoWin()?.name} win bruhhh`,
                    },
                  });
                }
              }
            }
            io.to(roomPanel.id).emit('server-game-info', { gameInfo });
          }
          io.to(roomPanel.id).emit('server-game-info', { gameInfo });
        }, 1000);
      }
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
      const gameInfo = gameList.getById(gameId);
      if (gameInfo) {
        const firstPlayer = onlineUserList.getUserById(gameInfo.firstPlayer.id);
        const secondPlayer = onlineUserList.getUserById(
          gameInfo.secondPlayer.id
        );
        firstPlayer.updateStatus(USER_STATUS.IN_ROOM);
        secondPlayer.updateStatus(USER_STATUS.IN_ROOM);
        const gameCallback = gameInfo.gameDraw();
        io.to(gameInfo?.idRoom).emit('server-game-info', {
          gameInfo: { ...gameCallback, status: 'Draw' },
        });
      }
    });

    socket.on('client-surrender', ({ gameId }) => {
      const gameInfo = gameList.getById(gameId);
      if (gameInfo) {
        const losePlayer = onlineUserList.getUserBySocketId(socket.id);
        if (losePlayer) {
          const game = gameInfo.updateLoser(losePlayer.id);
          if (game) {
            const first = onlineUserList.getUserById(game.firstPlayer.id);
            const second = onlineUserList.getUserById(game.secondPlayer.id);
            first.updateStatus(USER_STATUS.IN_ROOM);
            second.updateStatus(USER_STATUS.IN_ROOM);
            io.to(gameInfo?.idRoom).emit('server-game-info', {
              gameInfo: {
                ...game,
                status: `${game.whoWin()?.name} win bruhhh`,
              },
            });
          }
        }
      }
    });
  });
};

export default inGame;
