const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
const {
  getAllUser,
  login,
  register,
  logOut,
} = require('../controller/user.controller');
// const auth = require('../middleware/auth')
router.get('/', getAllUser);
router.post('/', errorHandle(login));
router.post('/register', errorHandle(register));
router.post('/logout', errorHandle(logOut));
module.exports = router;
