class User {
  constructor({ id, name, email, point, avatar }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.point = point;
    this.avatar = avatar;
    this.status = 'WAITING';
    this.inRoom = '';
    this.sockets = [];
  }
  joinRoom(roomId) {
    if (!this.inRoom || this.inRoom === roomId) {
      this.inRoom = roomId;
      return true;
    }
    return false;
  }
}

export default User;
