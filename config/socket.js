const IO = require("socket.io");
module.exports = {
  socketConfig: (server) => {
    const io = IO(server, {
      cors: true,
      origin: "*:*",
    });
    let currentUser = [];
    io.on("connection", (client) => {
      client.on("client-login", (res) => {
        const { user } = res;
        currentUser.push(user);
        io.sockets.emit("onlineUser", currentUser);
      });
      client.on("clien-logout", (res) => {
        currentUser = currentUser.filter((e) => e.id !== res.id);
        io.sockets.broadcast.emit("onlineUser", currentUser);
      });
    });
  },
};
