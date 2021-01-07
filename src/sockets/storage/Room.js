class Room {
  constructor(id, joinId, name, user) {
    this.id = id;
    this.joinId = joinId;
    this.name = name;
    this.createdBy = user.id;
    this.firstPlayer = user;
    this.secondPlayer = null;
    this.password = "";
    this.status = "WAITING";
    this.timePerStep = 30;
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
    if (this.viewingList.find((item) => item.id === user.id)||this.firstPlayer?.id === user.id||this.secondPlayer?.id === user.id) {
      return this;
    }
    if (this.firstPlayer?.id === user.id) {
      return this;
    }
    if (this.secondPlayer?.id === user.id) {
      return this;
    }
    this.viewingList.push(user);
    return this;
  }
}

export default Room;
