const { User, Game } = require('../database/models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const BadRequest = require('../utils/badRequest');

import { validateInfomation } from 'validator/user.validator';
import userService from 'service/user.service';
import {
  sendMailActiveAccount,
  sendMailResetPassword,
} from 'config/nodemailer';

module.exports = {
  async getAllUser(req, res) {
    await User.findAll({
      order: [
        ['id', 'DESC'],
        ['name', 'ASC'],
      ],
    }).then((users) => {
      res.send(users);
    });
  },

  async updateInfo(req, res) {
    const { value, error } = await validateInfomation.validate(req.body);
    if (error) throw new BadRequest(error);
    const user = await userService.updateInfomation(value);
    return res.json({ message: 'update success', data: { ...user } });
  },

  async getHistory(req, res) {
    const { id } = req.body;
    const history = await userService.getHistoryGame({ id });
    const CalcWinAndLose = ({ id, data }) => {
      let win = 0;
      let lose = 0;
      if (data.length > 0) {
        data.map((e) => {
          const { playerFirst, playerSecond, userWin } = e;
          const whoIsUser = playerFirst === id ? playerFirst : playerSecond;
          if (whoIsUser === userWin) {
            win++;
          } else {
            lose++;
          }
          return e;
        });
      }
      return { win, lose };
    };
    const { win, lose } = CalcWinAndLose({ id, data: history });
    if (history) {
      return res.json({ message: 'get history success', data: { win, lose } });
    }
    return res.json({ message: 'get history failed' });
  },

  async verify(req, res) {
    if (req.query?.decodekey) {
      const decodekey = req.query.decodekey;
      const decode = await jwt.verify(decodekey, process.env.JWT_SECRET);
      const { user, tokens, exp } = decode;
      console.log(exp * 1000 <= Date.now());
      const ver = await userService.verify({ ...user });
      return res.send({ user: ver, tokens });
    } else {
      const { user, tokens } = req.body;
      const { email, id } = user;
      const check = await userService.checkActived({ id });
      if (!check) {
        const secret = await jwt.sign(
          {
            user,
            tokens,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '900000', // expires in 15 minute
          }
        );
        const mail = await sendMailActiveAccount({
          receiverEmail: email,
          link: `${process.env.clientUrl}verify?decodekey=${secret}`,
        });
        return res.send(mail);
      } else {
        return res.send({ message: 'Account is actived' });
      }
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!!user) {
      const secret = await jwt.sign(
        { email, id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: 900000,
        }
      );
      const mail = await sendMailResetPassword({
        receiverEmail: email,
        link: `${process.env.clientUrl}forgotpassword?secretKey=${secret}`,
      });
      return res.send(mail);
    } else {
      throw new BadRequest('Email is not exist!');
    }
  },

  async resetPassword(req, res) {
    const { secretKey, password } = req.body;
    const decode = await jwt.verify(secretKey, process.env.JWT_SECRET);
    const { email, id } = decode;
    const user = await userService.changePassword({
      email,
      password,
      id,
    });
    return res.send(user);
  },

  async getAllInfo(req, res) {
    const { id } = req.params;
    const user = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        id,
      },
    });
    const totalMatches = await Game.findAndCountAll({
      where: {
        [Op.or]: [{ playerFirst: user.id }, { playerSecond: user.id }],
      },
    });
    const winMatches = await Game.findAndCountAll({
      where: {
        userWin: user.id,
      },
    });
    return res.send({
      ...user?.dataValues,
      totalMatches: totalMatches?.count,
      winMatches: winMatches?.count,
    });
  },
};
