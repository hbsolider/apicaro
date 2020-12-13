const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const {
  createBoard,
  updateBoard,
  deleteBoard,
  getListBoard,
} = require('../controller/board.controller.js');
const errorHandle = require('../utils/errorHandle');

router.get('/',authMiddleware,errorHandle(getListBoard))
router.post('/', authMiddleware, errorHandle(createBoard));
router.put('/', authMiddleware, errorHandle(updateBoard));
router.delete('/', authMiddleware, errorHandle(deleteBoard));
module.exports = router;
