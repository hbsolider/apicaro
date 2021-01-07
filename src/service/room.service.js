import { Room } from "database/models";

const roomService = {};

roomService.createOne = async (data) => {
  const { id, name, createdBy } = data;
  const newRoom = await Room.create({
    id,
    name,
    createdBy,
  });
  return newRoom;
};

export default roomService;
