import { Game, User, Room, Step, Message } from 'database/models';
const { Op } = require('sequelize');

const gameService = {};

gameService.getAll = async () => {
  const list = await Game.findAndCountAll({
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
    attributes: ['id', 'playerFirst', 'playerSecond', 'userWin', 'updatedAt'],
    // offset: (page - 1) * 11,
    // limit: limit,
    order: [['updatedAt', 'DESC']],
  });
  if (list) {
    return list;
  }
  return null;
};

gameService.getOneById = async (id) => {
  const { createdAt, completeAt } = await Game.findOne({
    where: {
      id,
    },
  });

  const game = await Game.findOne({
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
        include: [
          {
            model: Message,
            as: 'message',
            required: false,
            include: [
              {
                model: User,
                required: false,
                attributes: ['name'],
              },
            ],
            where: {
              createdAt: {
                [Op.between]: [createdAt, completeAt],
              },
            },
            order: [['createdAt', 'DESC']],
          },
        ],
      },
      {
        model: Step,
        as: 'step',
        required: false,
        attributes: ['board'],
      },
    ],
    where: {
      id,
    },
  });
  return game;
};

gameService.getManyAndCountByUser = async (userId) => {
  const games = await Game.findAndCountAll({
    where: {
      userId,
    },
  });
  return games;
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
      {
        model: Step,
        as: 'step',
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
