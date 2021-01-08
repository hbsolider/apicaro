import { onlineUserList, roomList } from './storage';
import Room from './storage/Room';

const getRoomList = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      if (user?.status === 'WAITING') {
        if (user.sockets.length === 1) {
          const roomPanel = roomList.leaveRoom(user.inRoom, user);
          io.to(user.inRoom).emit('server-send-leave-room', { roomPanel });
        }
      }
    });

    socket.on('client-leave-room', ({ room }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.leaveRoom(room.id, user);
      socket.leave(room.id);
      io.to(room.id).emit('server-send-leave-room', { roomPanel });
    });

    socket.on('client-create-room', ({ room }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const isInAnotherRoom = user.isInAnotherRoom();
      if (!isInAnotherRoom) {
        const roomCreated = new Room(room.id, room.joinId, room.name, user);
        roomList.add(roomCreated);
        socket.join(room.id);
        io.sockets.emit('server-send-room-list', {
          listRoom: roomList.transform(),
        });
      } else socket.emit('server-send-in-room', { inRoom: user.inRoom });
    });

    // socket.on('client-check-in-room', ({ room }) => {
    //   const user = onlineUserList.getUserBySocketId(socket.id);
    //   const isInAnotherRoom = user.isInAnotherRoom();
    //   const inRoom = isInAnotherRoom ? user.inRoom : '';
    //   socket.emit('server-send-in-room', { inRoom });
    // });

    socket.on('client-get-rooms', () => {
      const listRoom = roomList.transform();
      io.sockets.emit('server-send-room-list', { listRoom });
    });

    socket.on('client-join-wait-room', ({ roomId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const isJoinRoomSuccess = user.joinRoom(roomId);

      if (isJoinRoomSuccess) {
        roomList.updateViewingList(roomId, user);
        const roomPanel = roomList.getById(roomId);
        socket.join(roomId);
        io.to(roomId).emit('server-send-join-user', { roomPanel });
      } else socket.emit('server-send-in-room', { inRoom: user.inRoom });
    });
  });
};

export default getRoomList;
