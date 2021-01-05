// import {
//   handleCreateRoom,
//   transformRoomInfo,
//   handleDisconnect,
// } from './common';
// let rooms = {};
// const getRoomList = (io) => {
//   io.on('connection', (socket) => {
//     let roomId = '';
//     socket.on('disconnect', () => {
//       rooms = handleDisconnect(rooms, roomId, socket.id);
//     });
//     socket.on('client-create-room', ({ user, room }) => {
//       rooms = handleCreateRoom(rooms, user, room, socket.id);
//       const listRoom = transformRoomInfo(rooms);
//       io.sockets.emit('server-send-room-list', { listRoom });
//     });
//     socket.on('client-get-rooms', () => {
//       const listRoom = transformRoomInfo(rooms);
//       io.sockets.emit('server-send-room-list', { listRoom });
//     });
//     socket.on('client-join-wait-room', ({ roomId, user }) => {
//       roomId = roomId;
//       if (rooms[roomId]) {
//         rooms[roomId].sockets?.push(socket.id);
//         rooms[roomId].users?.push(user);
//         const userInRoom = rooms[roomId].users?.length;
//         if (userInRoom < 2) {
//           socket.join(roomId);
//           rooms[roomId].room.status = 'AVAILABLE';
//         } else rooms[roomId].room.status = 'PLAYING';
//         const listRoom = transformRoomInfo(rooms);
//         io.sockets.emit('server-send-room-list', { listRoom });
//         io.to(roomId).emit('server-send-join-user', {
//           guestUser: user,
//           hostUser: rooms[roomId]?.info,
//           room: rooms[roomId]?.room,
//         });
//       }
//     });
//   });
// };

// export default getRoomList;
