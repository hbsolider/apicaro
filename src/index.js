const http = require('http');
const { sequelize } = require('./database/models');
const app = require('./config/express');
import socketio from 'socket.io';
import initSockets from 'sockets';

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const server = http.createServer(app);
const io = socketio(server, {
  cors: true,
  origin: '*:*',
  credentials: true,
});
initSockets(io);

const PORT = process.env.PORT || 5000;
const useApp = async (port) => {
  await sequelize.authenticate().then(() => {
    console.log('Connected database');
    server.listen(port, () => {
      console.log(`App listen port ${port}`);
    });
  });
};
useApp(PORT);
