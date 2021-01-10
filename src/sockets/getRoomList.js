import { onlineUserList, roomList } from './storage';
import Room from './storage/Room';
import { USER_STATUS } from 'utils/constants';

const getRoomList = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      if (user?.status !== 'PLAYING') {
        if (user?.inRoom) {
          const usersInRoom = roomList.getAllUserRoomId(user?.inRoom);
          if (usersInRoom.length === 1) {
            roomList.remove(user?.inRoom);
            io.sockets.emit('server-send-room-list', {
              listRoom: roomList.transform(),
            });
          }

          const roomPanel = roomList.leaveRoom(user.inRoom, user);
          user.leaveRoom();
          user.updateStatus(USER_STATUS.ONLINE);
          socket.leave(user.inRoom);
          io.to(user.inRoom).emit('server-send-leave-room', { roomPanel });
          const userConnects = user.sockets;
          userConnects.forEach((connect) => {
            io.to(connect).emit('server-send-leaved-room', {
              isLeaveRoom: true,
            });
          });
        }
      }
    });

    socket.on('client-leave-room', ({ room }) => {
      const usersInRoom = roomList.getAllUserRoomId(room.id);
      if (usersInRoom.length === 1) {
        roomList.remove(room.id);
        io.sockets.emit('server-send-room-list', {
          listRoom: roomList.transform(),
        });
      }
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.leaveRoom(room.id, user);
      user.leaveRoom();
      user.updateStatus(USER_STATUS.ONLINE);
      socket.leave(room.id);
      io.to(room.id).emit('server-send-leave-room', { roomPanel });
      const userConnects = user.sockets;
      userConnects.forEach((connect) => {
        io.to(connect).emit('server-send-leaved-room', { isLeaveRoom: true });
      });
    });

    socket.on('client-create-room', ({ room }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const isInAnotherRoom = user.isInAnotherRoom(room.id);
      if (!isInAnotherRoom) {
        const roomCreated = new Room(
          room.id,
          room.joinId,
          room.name,
          user,
          room.password,
          room.timePerStep
        );
        roomList.add(roomCreated);

        user.updateStatus(USER_STATUS.IN_ROOM);
        socket.join(room.id);
        socket.emit('server-send-create-room', {
          roomId: room.id,
          password: room.password,
        });
        io.sockets.emit('server-send-room-list', {
          listRoom: roomList.transform(),
        });
      } else {
        const roomPanel = roomList.getById(user.inRoom);
        socket.emit('server-send-in-room', {
          inRoom: user.inRoom,
          joinId: roomPanel.joinId,
          password: roomPanel.password,
        });
      }
    });

    socket.on('client-check-pass-room', ({ password, roomId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.getById(roomId);
      const isInAnotherRoom = user.isInAnotherRoom(roomId);
      if (!isInAnotherRoom) {
        if (roomPanel?.password === password) {
          socket.emit('server-check-pass-room', {
            isInAnotherRoom,
            isCorrect: true,
            roomId,
            password,
          });
        } else {
          socket.emit('server-check-pass-room', {
            isCorrect: false,
            isInAnotherRoom,
          });
        }
      } else {
        const roomUserIn = roomList.getById(user.inRoom);
        socket.emit('server-check-pass-room', {
          isCorrect: false,
          isInAnotherRoom,
          inRoom: user.inRoom,
          joinId: roomUserIn.joinId,
          passRoomUserIn: roomUserIn.password,
        });
      }
    });

    socket.on('client-get-rooms', () => {
      const listRoom = roomList.transform();
      io.sockets.emit('server-send-room-list', { listRoom });
    });

    socket.on('client-check-room-have-pass', ({ roomId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.getById(roomId);
      const isInAnotherRoom = user.isInAnotherRoom(roomId);
      if (!isInAnotherRoom) {
        socket.emit('server-check-room-have-pass', {
          isInAnotherRoom,
          isHavePass: !!roomPanel.password,
          roomId,
          password: roomPanel.password,
        });
      } else {
        const roomUserIn = roomList.getById(user.inRoom);
        socket.emit('server-check-room-have-pass', {
          isInAnotherRoom,
          isHavePass: !!roomPanel.password,
          inRoom: user.inRoom,
          joinId: roomUserIn.joinId,
          passRoomUserIn: roomUserIn.password,
        });
      }
    });

    socket.on('client-check-pass-room-home', ({ password, roomId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const roomPanel = roomList.getById(roomId);
      const isInAnotherRoom = user.isInAnotherRoom(roomId);
      if (!isInAnotherRoom) {
        if (roomPanel?.password === password) {
          socket.emit('server-check-pass-room-home', {
            isInAnotherRoom,
            isCorrect: true,
            roomId,
            password,
          });
        } else {
          socket.emit('server-check-pass-room-home', {
            isCorrect: false,
            isInAnotherRoom,
          });
        }
      } else {
        const roomUserIn = roomList.getById(user.inRoom);
        socket.emit('server-check-pass-room-home', {
          isCorrect: false,
          isInAnotherRoom,
          inRoom: user.inRoom,
          joinId: roomUserIn.joinId,
          passRoomUserIn: roomUserIn.password,
        });
      }
    });

    socket.on('client-join-wait-room', ({ roomId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const isJoinRoomSuccess = user.joinRoom(roomId);
      const roomPanel = roomList.getById(roomId);
      if (isJoinRoomSuccess) {
        roomList.updateViewingList(roomId, user);

        user.updateStatus(USER_STATUS.IN_ROOM);
        socket.join(roomId);
        io.to(roomId).emit('server-send-join-user', { roomPanel });
      } else
        socket.emit('server-send-in-room', {
          inRoom: user.inRoom,
          password: roomPanel.password,
        });
    });

    socket.on('client-invite-join-room', ({ userInvited }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const connectsUserInvited = userInvited.sockets;
      const roomPanel = roomList.getById(user.inRoom);

      connectsUserInvited.forEach((connect) => {
        socket.to(connect).emit('server-send-invite-join-room', {
          user,
          inRoom: user.inRoom,
          joinId: roomPanel.joinId,
          password: roomPanel.password,
        });
      });
    });
  });
};

export default getRoomList;
