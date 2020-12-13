const App = require('./config/express');
const http = require('http');
const socket = require('./config/socket');
const { sequelize } = require('./database/models');

App.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    errorStatus: error.status || 500,
    error: {
      message: error.message || 'some thing is wrong',
      ...error,
    },
  });
});

const PORT = process.env.PORT || 5000;
const useApp = async (port) => {
  await sequelize.authenticate().then(() => {
    console.log('Connected database');
    const server = http.createServer(App);
    socket.socketConfig(server);
    server.listen(port, () => {
      console.log(`App listen port ${port}`);
    });
  });
};
useApp(PORT);
