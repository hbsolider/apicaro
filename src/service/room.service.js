import { Room } from 'database/models';
import { v4 as uuidv4 } from 'uuid';

const roomService = {};

roomService.createOne = async (data) => {
  const { name } = data;
  const room = await Room.findOne({ where: { name } });
  if (room) throw new Error('Room name already exists');
  const newRoom = await Room.create({ ...data, id: uuidv4() });

  return newRoom;
};

export default roomService;
