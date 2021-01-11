import moment from 'moment';
class User {
  constructor({ id, name, email, point, avatar, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.point = point;
    this.avatar = avatar;
    this.createdAt = moment(createdAt).format('YYYY-MM-DD');
    this.status = 'ONLINE';
    this.inRoom = '';
    this.sockets = [];
  }
  joinRoom(roomId) {
    if (this.inRoom === '' || this.inRoom === roomId) {
      this.inRoom = roomId;
      return true;
    }
    return false;
  }
  isInAnotherRoom(roomId) {
    return !!(this.inRoom && this.inRoom !== roomId);
  }
  leaveRoom() {
    this.inRoom = '';
  }
  updateStatus(status) {
    this.status = status;
  }

  toggleReady() {
    if (this.status === 'READY') this.updateStatus('IN_ROOM');
    else {
      if (this.status === 'IN_ROOM') this.updateStatus('READY');
    }
    return this;
  }
}

export default User;
