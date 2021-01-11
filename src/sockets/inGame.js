import { onlineUserList, roomList, Game } from './storage';

const inGame = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-create-game', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      let roomPanel = roomList.getById(user.inRoom);
      roomPanel = roomPanel.updateStatus('PLAYING');
      io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
    });
  });
};

export default inGame;
