import { onlineUserList, roomList } from './storage';
import User from './storage/User';

const getOnlineList = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-connect', ({ user }) => {
      socket.user = user;
      const clientUser = new User(user);
      onlineUserList.add(clientUser, socket.id);
      const userList = onlineUserList.transform();
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('client-update-users-status', () => {
      const userList = onlineUserList.transform();
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('disconnect', () => {
      if (socket.user) onlineUserList.remove(socket.user, socket.id);
      const userList = onlineUserList.transform();
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('client-logout', () => {
      if (socket.user) onlineUserList.remove(socket.user, socket.id);
      const userList = onlineUserList.transform();
      io.sockets.emit('server-send-user-list', { userList });
    });
  });
};

export default getOnlineList;
