const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
const {
  getAllUser,
  login,
  register,
  logOut,
  updateInfo,
  getHistory,
} = require('../controller/user.controller');
// const auth = require('../middleware/auth')
router.get('/', getAllUser);
router.post('/', errorHandle(login));
router.patch('/', errorHandle(updateInfo)); //update user
router.post('/register', errorHandle(register));
router.post('/logout', errorHandle(logOut));
router.post('/rate', errorHandle(getHistory));
module.exports = router;
