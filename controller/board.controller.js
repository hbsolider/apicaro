const { board: Board } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const BadRequest = require('../utils/badRequest');

module.exports = {
  getListBoard: async (req, res) => {
    const list = await Board.findAll();
    res.json(list);
  },
  createBoard: async (req, res, next) => {
    const title = req.body.title || 'Caro board';
    const board = await Board.create({
      title,
      id: uuidv4(),
      userId: req.user.id,
    }).catch((e) => next(e));
    res.json({
      message: 'create table success',
      data: {
        userId: req.user.id,
        boardId: board.id,
      },
    });
  },
  updateBoard: async (req, res, next) => {
    const { title, id } = req.body;
    if (!title) throw new Error('title is not defined');
    const board = await Board.findOne({ where: { id } });
    if (!board) throw new BadRequest(`board doesn't exist`);
    if (board.userId !== req.user.id) throw new Error('not permission');
    if (!board) throw new Error('this board is not exist');
    res.json({ message: 'update success' });
  },
  deleteBoard: async (req, res, next) => {
    const { id } = req.body;
    if (!id) throw new Error('id is required');
    const board = await Board.findOne({ where: { id } });
    if (!board) throw new Error(`board doesn't exist`);
    if (board.userId !== req.user.id) throw new Error('not permission');
    const destroy = await Board.destroy({ where: { id } });
    res.json({ message: 'delete success!', board: destroy });
  },
};
