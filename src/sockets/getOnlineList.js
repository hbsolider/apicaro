const getOnlineList = (io) => {
  let clients = [];
  io.on('connection', (socket) => {
    let userId = '';

    socket.on('client-connect', ({ user }) => {
      userId = user.id;

      if (clients[userId]) {
        clients[userId]?.sockets?.push(socket.id);
      } else {
        clients[userId] = { info: user, sockets: [socket.id] };
      }

      const listUser = Object.values(clients).map(({ info }) => ({
        id: info.id,
        email: info.email,
        name: info.name,
      }));
      io.sockets.emit('server-send-user-list', { listUser });
    });

    socket.on('disconnect', () => {
      clients[userId].sockets = clients[userId].sockets?.filter(
        (socketId) => socketId !== socket.id
      );

      if (clients[userId].sockets && !clients[userId].sockets.length)
        delete clients[userId];

      const listUser = Object.values(clients).map(({ info }) => ({
        id: info.id,
        email: info.email,
        name: info.name,
      }));
      io.sockets.emit('server-send-user-list', { listUser });
    });

    socket.on('client-logout', ({ user }) => {
      clients[userId].sockets = clients[userId].sockets?.filter(
        (socketId) => socketId !== socket.id
      );

      if (clients[userId].sockets && !clients[userId].sockets.length)
        delete clients[userId];

      const listUser = Object.values(clients).map(({ info }) => ({
        id: info.id,
        email: info.email,
        name: info.name,
      }));
      io.sockets.emit('server-send-user-list', { listUser });
    });
  });
};

export default getOnlineList;
