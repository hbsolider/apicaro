import gameService from 'service/game.service';

export const getListGame = async (req, res) => {
  //   let page = req.query.page || 1;
  //   let limit = req.query.limit || 11;
  const list = await gameService.getAll();
  if (list) {
    return res.json({ message: 'get list game success', data: list });
  }
  return res.json({ message: 'get list game failed', data: null });
};

export const getListGameByUser = async (req, res) => {
  const { user } = req;
  const games = await gameService.listGamesByUser(user.id);
  return res.json({ message: 'Success', data: games });
};
