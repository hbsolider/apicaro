const getOnlineList = (io) => {
  let currentUser = [];
  io.on("connection", (client) => {
    console.log("Connected: ", client.id);

    client.on("disconnect", function () {
      console.log("Disconnected: ", client.id);

      currentUser = currentUser.filter((e) => e.clientId !== client.id);
      io.sockets.emit("onlineUser", currentUser);
    });

    client.on("client-login", (res) => {
      const { user } = res;
      const userLogin = { ...user, clientId: client.id };
      currentUser.push(userLogin);
      io.sockets.emit("onlineUser", currentUser);
    });

    client.on("client-get-list", (res) => {
      io.sockets.emit("onlineUser", currentUser);
    });

    client.on("client-logout", (res) => {
      const { user } = res;
      const index = currentUser.findIndex(
        (item) => user.email === item.email
      );
          currentUser.splice(index, 1);
      io.sockets.emit("onlineUser", currentUser);
    });
  });
};

export default getOnlineList;
