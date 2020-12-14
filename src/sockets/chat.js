import moment from 'moment';
import { handleConnect, handleDisconnect } from './common';

let clients = {};
let messages = [];
const chat = (io) => {
  io.on('connection', (socket) => {
    let userId = '';
    socket.on('client-connect', ({ user }) => {
      userId = user.id;
      clients = handleConnect(clients, user, socket.id);
    });

    socket.on('disconnect', () => {
      clients = handleDisconnect(clients, userId, socket.id);
    });

    socket.on('client-logout', ({ user }) => {
      clients = handleDisconnect(clients, userId, socket.id);
    });

    socket.on('client-get-messages', () => {
      io.sockets.emit('server-send-messages', { messages });
    });

    socket.on('client-send-message', ({ message }) => {
      messages.push({
        userId,
        content: message,
        time: moment().format('LT'),
      });

      io.sockets.emit('server-send-messages', { messages });
    });
  });
};

export default chat;
