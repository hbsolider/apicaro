const getOnlineList = (io) => {
  let currentUser = [];
  io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`);
    });

    socket.on('client-login', (res) => {
      const { user } = res;
      currentUser.push(user);
      io.sockets.emit('onlineUser', currentUser);
    });

    socket.on('client-logout', (res) => {
      const { user } = res;
      currentUser = currentUser.filter((e) => e.email !== user.email);
      io.sockets.emit('onlineUser', currentUser);
    });
  });
};

export default getOnlineList;
