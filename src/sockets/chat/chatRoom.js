// import moment from 'moment';
// import { handleDisconnect } from '../common';

// let rooms = {};

// const chatRoom = (io) => {
//   io.on('connection', (socket) => {
//     let user;
//     let roomId = '';

//     socket.on('disconnect', () => {
//       rooms = handleDisconnect(rooms, roomId, socket.id);
//     });

//     socket.on('client-logout', () => {
//       rooms = handleDisconnect(rooms, roomId, socket.id);
//     });

//     socket.on('client-join-room', ({ roomId, user: resUser }) => {
//       roomId = roomId;
//       user = { ...resUser };
//       if (rooms[roomId]) {
//         rooms[roomId].sockets?.push(socket.id);
//       } else {
//         rooms[roomId] = { messages: [], sockets: [socket.id] };
//       }
//       socket.join(roomId);
//       socket.emit('server-send-messages-room', {
//         messages: rooms[roomId]?.messages,
//       });
//     });

//     socket.on('client-send-message-room', ({ roomId, message }) => {
//       rooms[roomId]?.messages?.push({
//         userId: user?.id,
//         name: user?.name ?? 'Anonymous',
//         content: message,
//         time: moment().format('LT'),
//       });

//       io.to(roomId).emit('server-send-messages-room', {
//         messages: rooms[roomId]?.messages,
//       });
//     });
//   });
// };

// export default chatRoom;
