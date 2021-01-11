class Room {
  constructor(id, joinId, name, user, password, timePerStep) {
    this.id = id;
    this.joinId = joinId;
    this.name = name;
    this.createdBy = user.id;
    this.firstPlayer = user;
    this.secondPlayer = null;
    this.password = password ?? '';
    this.status = 'WAITING';
    this.timePerStep = timePerStep || 30;
    this.viewingList = [];
  }

  join(user) {
    if (!this.firstPlayer) {
      this.firstPlayer = user;
      return this;
    }
    if (!this.secondPlayer) {
      this.secondPlayer = user;
      return this;
    }
    this.viewingList.push(user);
    return this;
  }

  leave(userId) {
    this.updateStatus('WAITING');
    if (this.firstPlayer?.id === userId) {
      this.firstPlayer = null;
      return this;
    }
    if (this.secondPlayer?.id === userId) {
      this.secondPlayer = null;
      return this;
    }
    this.viewingList = this.viewingList.filter((user) => user.id !== userId);
    return this;
  }

  updateViewingList(user) {
    if (
      this.viewingList.find((item) => item.id === user.id) ||
      this.firstPlayer?.id === user.id ||
      this.secondPlayer?.id === user.id
    ) {
      return this;
    }
    this.viewingList.push(user);
    return this;
  }

  getUserById(userId) {
    if (this.firstPlayer?.id === userId) return this.firstPlayer;
    if (this.secondPlayer?.id === userId) return this.secondPlayer;
    return this.viewingList.find((item) => item.id === userId);
  }

  getAllUserInRoom() {
    const users = [];
    if (this.firstPlayer) {
      users.push(this.firstPlayer);
    }
    if (this.secondPlayer) {
      users.push(this.secondPlayer);
    }
    users.push(...this.viewingList);
    return users;
  }

  isInBoard(user) {
    if (this.firstPlayer?.id === user.id || this.secondPlayer?.id === user.id) {
      return true;
    }
    return false;
  }

  isBoardFull() {
    return this.firstPlayer && this.secondPlayer;
  }

  joinBoard(user) {
    if (!this.firstPlayer) {
      this.firstPlayer = user;
      this.viewingList = this.viewingList.filter((item) => item.id !== user.id);
      return this;
    }
    if (!this.secondPlayer) {
      this.secondPlayer = user;
      this.viewingList = this.viewingList.filter((item) => item.id !== user.id);
      return this;
    }
    return this;
  }

  outBoard(user) {
    if (this.firstPlayer?.id === user.id) {
      this.firstPlayer = null;
      this.viewingList.push(user);
      return this;
    }
    if (this.secondPlayer?.id === user.id) {
      this.secondPlayer = null;
      this.viewingList.push(user);
      return this;
    }
    return this;
  }

  joinOutBoard(user) {
    user.updateStatus('IN_ROOM');
    if (this.isInBoard(user)) return this.outBoard(user);
    return this.joinBoard(user);
  }

  isAllReady() {
    return (
      this.firstPlayer?.status === 'READY' &&
      this.secondPlayer?.status === 'READY'
    );
  }

  updateStatus(status) {
    this.status = status;
    return this;
  }

  startToPlay() {
    if (this.isAllReady()) {
      this.updateStatus('PLAYING');
      this.firstPlayer?.updateStatus('PLAYING');
      this.secondPlayer?.updateStatus('PLAYING');
      return this;
    }
  }
}

export default Room;
