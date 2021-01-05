import { pick } from 'utils/common';

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
    if (room?.id) this.rooms[room.id] = { ...room };
  }

  remove(roomId) {
    if (this.rooms[roomId]) delete this.rooms[roomId];
  }

  transform(keys) {
    return Object.values(this.rooms).map((room) => pick(room, keys));
  }
}

export default RoomList;
