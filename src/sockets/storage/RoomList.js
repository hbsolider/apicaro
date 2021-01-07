import { pick } from 'utils/common';
import { roomService } from 'service';

class RoomList {
  constructor() {
    if (RoomList.instance) {
      return RoomList.instance;
    }
    RoomList.instance = this;
    this.rooms = {};
  }

  getAll() {
    return this.rooms;
  }

  getById(roomId) {
    return this.rooms[roomId] ?? null;
  }

  add(room) {
    if (room?.id) this.rooms[room.id] = room;
    roomService.createOne(room);
  }

  remove(roomId) {
    if (this.rooms[roomId]) delete this.rooms[roomId];
  }

  transform(keys) {
    return Object.values(this.rooms).map((room) => pick(room, keys));
  }

  updateViewingList(roomId, user) {
    return this.rooms[roomId]?.updateViewingList(user);
  }
  leaveRoom(roomId, user) {
    return this.rooms[roomId]?.leave(user.id);
  }
}

export default RoomList;
