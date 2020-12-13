const User = require("../database/models").user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async getAllUser(req, res) {
    await User.findAll().then((users) => {
      res.send(users);
    });
  },
  async login(req, res) {
    const { email, password } = req.body;
    await User.findOne({
      where: {
        email,
      },
    }).then(async (user) => {
      if (user) {
        const comparePass = bcrypt.compareSync(password, user.password);
        if (comparePass) {
          const token = await jwt.sign(
            {
              user,
            },
            process.env.JWT_SECRET
          );
          req.user = user;
          return res.status(200).json({ success: "login success", token, user });
        }
      }
      return res.status(400).json({error:'account not exist'})
    });
  },
  async register(req, res) {
    const { email, name, point = 0, password } = req.body;
    await User.findOne({
      where: {
        email,
      },
    }).then(async (user) => {
      if (!user) {
        const salt = bcrypt.genSaltSync(12);
        const newpassword = bcrypt.hashSync(password, salt);
        return await User.create({
          id:uuidv4(),
          email,
          name,
          point,
          password: newpassword,
        }).then((newUser) => {
          if (!newUser) {
            return res.status(400).json({ error: "something went wrongs" });
          }
          return res.status(201).json({
            success: "register success",
            data: {
              user: {
                name: newUser.name,
                email: newUser.email,
                point: newUser.point,
              },
            },
          });
        });
      }
      return res.status(400).json({ error: "account is existing" });
    });
  },
  async logOut(req, res) {
  },
  async updateInfo(req, res) {},
};
