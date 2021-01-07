import { roomList } from "./storage";
import Room from "./storage/Room";
import { v4 as uuidv4 } from "uuid";
const getRoomList = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      //   rooms = handleDisconnect(rooms, roomId, socket.id);
    });
    socket.on("client-create-room", ({ user, room }) => {
      const roomCreated = new Room(uuidv4(), room.joinId, room.name, user);
      roomList.add(roomCreated);
      io.sockets.emit("server-send-room-list", {
        listRoom: roomList.transform(),
      });
    });
    socket.on("client-get-rooms", () => {
      const listRoom = roomList.transform();
      io.sockets.emit("server-send-room-list", { listRoom });
    });
    socket.on("client-join-wait-room", ({ roomId, user }) => {
      roomList.updateViewingList(roomId, user);
      const listRoom = roomList.transform();
      io.sockets.emit("server-send-room-list", { listRoom });
      //   roomId = roomId;
      //   if (rooms[roomId]) {
      //     rooms[roomId].sockets?.push(socket.id);
      //     rooms[roomId].users?.push(user);
      //     const userInRoom = rooms[roomId].users?.length;
      //     if (userInRoom < 2) {
      //       socket.join(roomId);
      //       rooms[roomId].room.status = "AVAILABLE";
      //     } else rooms[roomId].room.status = "PLAYING";
      //     const listRoom = transformRoomInfo(rooms);
      //     io.sockets.emit("server-send-room-list", { listRoom });
      //     io.to(roomId).emit("server-send-join-user", {
      //       guestUser: user,
      //       hostUser: rooms[roomId]?.info,
      //       room: rooms[roomId]?.room,
      //     });
      //   }
    });
  });
};

export default getRoomList;
