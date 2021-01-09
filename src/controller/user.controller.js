const { User } = require('../database/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidate } = require('../validator/auth.validator');
const BadRequest = require('../utils/badRequest');
const { v4: uuidv4 } = require('uuid');
import { validateInfomation } from 'validator/user.validator';
import userSevice from 'service/user.service';
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
    const user = await userSevice.updateInfomation(value);
    return res.json({ message: 'update success', data: { ...user } });
  },

  async getHistory(req, res) {
    const { id } = req.body;
    const history = await userSevice.getHistoryGame({ id });
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
};
