import { Game, User } from 'database/models';
const { Op } = require('sequelize');

const gameService = {};

gameService.getAll = async () => {
  const list = await Game.findAndCountAll({
    include: [
      {
        model: User,
        as: 'infoPlayerFirst',
      },
      {
        model: User,
        as: 'infoPlayerSecond',
      },
    ],
    attributes: ['id', 'playerFirst', 'playerSecond', 'userWin'],
    // offset: (page - 1) * 11,
    // limit: limit,
    order: [['id', 'DESC']],
  });
  if (list) {
    return list;
  }
  return null;
};

export default gameService;
