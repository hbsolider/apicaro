class BadRequest extends Error {
  constructor(arg) {
    super(arg);
    this.status = 400;
  }
}
module.exports = BadRequest;
