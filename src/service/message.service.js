import { Message, User } from 'database/models';

const messageService = {};

messageService.createOne = async (data) => {
  const newMessage = await Message.create(data);
  return newMessage;
};

messageService.getManyByRoomId = async (roomId) => {
  const messages = await Message.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
    where: {
      roomId,
    },
    raw: true,
    nest: true,
  });
  return messages;
};

export default messageService;
