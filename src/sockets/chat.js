const chat = (io) => {
  io.on('connection', (client) => {
    client.on('disconnect', () => {});
  });
};

export default chat;
