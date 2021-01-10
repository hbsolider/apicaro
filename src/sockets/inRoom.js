import { onlineUserList, roomList } from './storage';
import Room from './storage/Room';
import { USER_STATUS } from 'utils/constants';

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
      if (roomPanel.isAllReady()) roomPanel.updateStatus('PLAYING');
      io.to(user.inRoom).emit('server-panel-room-info', { roomPanel });
    });
  });
};

export default getRoomList;
