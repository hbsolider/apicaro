import { pick } from 'utils/common';

class OnlineUserList {
  constructor() {
    if (OnlineUserList.instance) {
      return OnlineUserList.instance;
    }
    OnlineUserList.instance = this;
    this.users = {};
  }

  getAll() {
    return this.users;
  }

  getUserById(userId) {
    return this.users[userId] ?? null;
  }

  getUserBySocketId(socketId) {
    return Object.values(this.users).find((item) =>
      item.sockets?.includes(socketId)
    );
  }

  add(user, socketId) {
    const { id } = user;
    if (this.users[id]) {
      this.users[id].sockets = [
        ...new Set([...this.users[id].sockets, socketId]),
      ];
    } else {
      user.sockets.push(socketId);
      this.users[id] = user;
    }
    return this.users;
  }

  remove(user, socketId) {
    const { id } = user;
    if (this.users[id])
      this.users[id].sockets = this.users[id]?.sockets?.filter?.(
        (item) => item !== socketId
      );
    if (this.users[id]?.sockets && this.users[id].sockets.length === 0)
      delete this.users[id];
    return this.users;
  }

  transform(keys) {
    return Object.values(this.users).map((user) => pick(user, keys));
  }
}

export default OnlineUserList;
