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
      client.on("client-logout", (res) => {
        const { user } = res;
        currentUser = currentUser.filter((e) => e.email !== user.email);
        io.sockets.emit("onlineUser", currentUser);
      });
    });

    io.on("disconnect", (client) => {
      console.log("id", client.id);
    });
  },
};
