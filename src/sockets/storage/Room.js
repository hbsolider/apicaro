class Room {
  constructor(id, name, createdBy) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.password = '';
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
}

export default Room;
