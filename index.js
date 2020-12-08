const express = require("express");
const http = require("http");
const socket = require('./config/socket')
const { sequelize, User } = require("./database/models");
const app = express();
const cors = require("cors");
app.enable("trust proxy");
app.use(express.json());
app.use(cors(require("./config/cors").cors));
app.use("/api/user", require("./router/user.router"));
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
const PORT = process.env.PORT || 5000;
const useApp = async (port) => {
  await sequelize.authenticate().then(() => {
    console.log("Connected database");
    const server = http.createServer(app);
    socket.socketConfig(server);
    server.listen(port, () => {
      console.log(`App listen port ${port}`);
    });
  });
};
useApp(PORT);
