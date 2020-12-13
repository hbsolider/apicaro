const User = require('../database/models').user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidate } = require('../validator/auth.validator');
const BadRequest = require('../utils/badRequest');
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async getAllUser(req, res) {
    await User.findAll().then((users) => {
      res.send(users);
    });
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Email or password is not valid!');
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) throw new Error('Password is incorrect!');
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    req.user = user;
    res.json({
      success: 'login success',
      token,
      user: { id: user.id, email: user.email, name: user.name, point: user.point },
    });
  },
  async register(req, res) {
    const { value, error } = await registerValidate.validate(req.body);
    if (error) throw new BadRequest(error);
    const user = await User.findOne({ where: { email: value.email } });
    if (user) throw new Error(`acount is exist`);
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(value.password, salt);
    const newUser = await User.create({
      id: uuidv4(),
      ...value,
      password: newPassword,
    });
    res.json({ message: 'register success', data: { ...newUser } });
  },
  async logOut(req, res) {},
  async updateInfo(req, res) {},
};
