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

gameService.listGamesByUser = async (id) => {
  const games = await Game.findAll({
    include: [
      {
        model: User,
        as: 'infoPlayerFirst',
        required: false,
      },
      {
        model: User,
        as: 'infoPlayerSecond',
        required: false,
      },
      {
        model: Room,
        as: 'room',
        required: false,
      },
    ],
    where: {
      [Op.or]: [{ playerFirst: id }, { playerSecond: id }],
    },
    order: [['createdAt', 'DESC']],
  });
  return games;
};

gameService.createOne = async (data) => {
  const { id, roomId, firstPlayer, secondPlayer } = data;
  const newRoom = await Room.create({
    id,
    roomId,
    playerFirst: firstPlayer,
    playerSecond: secondPlayer,
  });
  return newRoom;
};

export default gameService;
