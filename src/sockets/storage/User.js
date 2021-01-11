import moment from 'moment';
import { USER_RANK } from 'utils/constants';
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

  clone({
    id,
    name,
    email,
    point,
    avatar,
    createdAt,
    status,
    inRoom,
    sockets,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.point = point;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.status = status;
    this.inRoom = inRoom;
    this.sockets = [...sockets];
    return this;
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
  getRankUser() {
    const point = this.point;
    let rank = USER_RANK.BRONZE;
    if (100 <= point && point < 200) {
      rank = USER_RANK.SILVER;
    }
    if (200 <= point && point < 300) {
      rank = USER_RANK.GOLD;
    }
    if (300 <= point && point < 400) {
      rank = USER_RANK.PLATINUM;
    }
    if (400 <= point && point < 500) {
      rank = USER_RANK.DIAMOND;
    }
    if (point > 500) {
      rank = USER_RANK.MASTER;
    }
    return rank;
  }
}

export default User;
