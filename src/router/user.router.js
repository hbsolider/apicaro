const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
import { auth } from 'middleware/auth';
import { ROLES } from 'utils/constants';
const {
  getAllUser,
  login,
  register,
  logOut,
  updateInfo,
  getHistory,
} = require('../controller/user.controller');
// const auth = require('../middleware/auth')
router.get('/', auth(ROLES.ADMIN), getAllUser);
router.patch('/', errorHandle(updateInfo));
router.post('/rate', errorHandle(getHistory));
module.exports = router;
