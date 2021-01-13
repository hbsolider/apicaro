import { Step } from 'database/models';
import { v4 as uuidv4 } from 'uuid';
const stepService = {};

stepService.create = async ({ userId, gameId, board }) => {
  const step = await Step.create({
    id: uuidv4(),
    userId,
    gameId,
    board,
  });
  return step;
};
export default stepService;
