class MatchingListUser {
  constructor() {
    this.users = [];
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(user) {
    if (user.id !== this.front()?.id) {
      this.size += 1;
      this.users.push(user);
      return true;
    }
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    this.size -= 1;
    return this.users.shift();
  }

  front() {
    if (this.isEmpty()) return undefined;

    return this.users[0];
  }

  rear() {
    if (this.isEmpty()) return undefined;

    return this.users[this.size - 1];
  }

  clear() {
    this.users.length = 0;
    this.size = 0;
  }
}

export default MatchingListUser;
