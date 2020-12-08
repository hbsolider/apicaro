const { response } = require("express");
const IO = require("socket.io");
module.exports = {
  socketConfig: (app) => {
    const io = IO(server, {
      cors: true,
      origin: "*:*",
    });
    let currentUser = [];
    io.on("connection", (client) => {
      client.on("client-login", (res) => {
        const { user } = res;
        currentUser.push(user);
        io.socket.emmit("onlineUser", currentUser);
      });
      client.on("clien-logout", (res) => {
        currentUser = currentUser.filter((e) => e.id !== res.id);
        io.socket.broadcast.emit("onlineUser", currentUser);
      });
    });
  },
};
