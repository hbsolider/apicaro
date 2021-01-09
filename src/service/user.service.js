import { User, Game } from 'database/models';
const { Op } = require('sequelize');
const userService = {};
userService.updateInfomation = async (data) => {
  if (Object.keys(data).length !== 0) {
    const user = await User.findOne({ where: { id: data.id } });
    if (Object.keys(data).includes('point')) {
      data = { ...data, point: parseInt(data.point) };
    }
    const updatedUser = { ...user, ...data };
    user.update(updatedUser);
    return user;
  }
  return null;
};
userService.getHistoryGame = async ({ id }) => {
  const history = await Game.findAll({
    attributes: ['playerFirst', 'playerSecond', 'userWin'],
    where: {
      [Op.or]: [{ playerFirst: id }, { playerSecond: id }],
    },
  });
  if (history) {
    return history;
  }
  return null;
};
export default userService;
