import { Game, User, Room } from 'database/models';
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
      {
        model: Room,
      },
    ],
    attributes: ['id', 'playerFirst', 'playerSecond', 'userWin', 'updatedAt'],
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
