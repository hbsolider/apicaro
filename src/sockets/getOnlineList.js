import { handleConnect, transformUserInfo, handleDisconnect } from './common';

let clients = {};
const getOnlineList = (io) => {
  io.on('connection', (socket) => {
    let userId = '';

    socket.on('client-connect', ({ user }) => {
      userId = user.id;
      clients = handleConnect(clients, user, socket.id);
      const listUser = transformUserInfo(clients);
      io.sockets.emit('server-send-user-list', { listUser });
    });

    socket.on('disconnect', () => {
      clients = handleDisconnect(clients, userId, socket.id);
      const listUser = transformUserInfo(clients);
      io.sockets.emit('server-send-user-list', { listUser });
    });

    socket.on('client-logout', ({ user }) => {
      clients = handleDisconnect(clients, userId, socket.id);
      const listUser = transformUserInfo(clients);
      io.sockets.emit('server-send-user-list', { listUser });
    });
  });
};

export default getOnlineList;
