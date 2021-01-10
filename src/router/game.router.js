const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
import { auth } from 'middleware/auth';
import { getListGame } from 'controller/game.controller';
import { getListGameByUser } from 'controller/game.controller';

router.get('/', errorHandle(getListGame));
router.get('/user', auth(), getListGameByUser);

module.exports = router;
