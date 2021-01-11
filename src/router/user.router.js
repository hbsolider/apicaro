const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
import { auth } from 'middleware/auth';
import { ROLES } from 'utils/constants';
const {
  getAllUser,
  updateInfo,
  getHistory,
  verify,
} = require('../controller/user.controller');
import { validateVerify, validateDecodeKey } from 'validator/user.validator';
import validate from 'middleware/validate';

// const auth = require('../middleware/auth')
router.get('/', auth(ROLES.ADMIN), getAllUser);
router.patch('/', errorHandle(updateInfo));
router.post('/rate', errorHandle(getHistory));
router.post('/verify', validate(validateVerify), errorHandle(verify));
router.get('/verify', validate(validateDecodeKey), errorHandle(verify));
module.exports = router;
