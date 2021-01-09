const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
import { getListGame } from 'controller/game.controller';

router.get('/', errorHandle(getListGame));

module.exports = router;
