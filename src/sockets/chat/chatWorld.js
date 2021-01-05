// import moment from 'moment';
// import { onlineUserList } from '../storage';

// let clients = {};
// let messages = [];
// const chatWorld = (io) => {
//   io.on('connection', (socket) => {
//     const user = onlineUserList.getUserBySocketId(socket.id);

//     socket.on('client-get-messages', () => {
//       io.sockets.emit('server-send-messages', { messages });
//     });

//     socket.on('client-send-message', ({ message }) => {
//       messages.push({
//         userId,
//         name: clients[userId]?.info?.name ?? 'Anonymous',
//         content: message,
//         time: moment().format('LT'),
//       });

//       io.sockets.emit('server-send-messages', { messages });
//     });
//   });
// };

// export default chatWorld;
