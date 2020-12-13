const chat = (io) => {
  io.on("connection", (client) => {
    console.log("Connected: ", client.id);
    client.on("disconnect", () => {
      console.log("Disconnected: ", client.id);
    });
  });
};

export default chat;
