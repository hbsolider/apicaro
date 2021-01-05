import { onlineUserList } from './storage';

const getOnlineList = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-connect', ({ user }) => {
      socket.user = user;
      onlineUserList.add(user, socket.id);
      const userList = onlineUserList.transform(['id', 'email', 'name']);
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('disconnect', () => {
      if (socket.user) onlineUserList.remove(socket.user, socket.id);
      const userList = onlineUserList.transform(['id', 'email', 'name']);
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('client-logout', () => {
      if (socket.user) onlineUserList.remove(socket.user, socket.id);
      const userList = onlineUserList.transform(['id', 'email', 'name']);
      io.sockets.emit('server-send-user-list', { userList });
    });
  });
};

export default getOnlineList;
