import { onlineUserList, roomList, Game } from './storage';

const inGame = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-create-game', ({ roomPanel }) => {
      console.log('roomPanel', roomPanel);
    });
  });
};

export default inGame;
