import { onlineUserList, roomList } from './storage';

const getRoomList = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-user-join-out-board', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      let roomPanel = roomList.getById(user.inRoom);
      roomPanel = roomPanel.joinOutBoard(user);
      io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
    });

    socket.on('client-user-toggle-ready', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      let roomPanel = roomList.getById(user.inRoom);
      user.toggleReady();
      roomPanel.startToPlay();
      io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
      io.sockets.emit('server-send-user-list', {
        userList: onlineUserList.transform(),
      });
    });
  });
};

export default getRoomList;
