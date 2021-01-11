const router = require('express').Router();
const errorHandle = require('../utils/errorHandle');
import { auth } from 'middleware/auth';
import { ROLES } from 'utils/constants';
const {
  getAllUser,
  updateInfo,
  getHistory,
  verify,
  forgotPassword,
  resetPassword,
} = require('../controller/user.controller');
import {
  validateVerify,
  validateDecodeKey,
  validateForgotPassword,
  validateRequestRecovery,
} from 'validator/user.validator';
import validate from 'middleware/validate';

// const auth = require('../middleware/auth')
router.get('/', auth(ROLES.ADMIN), getAllUser);
router.patch('/', errorHandle(updateInfo));
router.post('/rate', errorHandle(getHistory));
router.post('/verify', validate(validateVerify), errorHandle(verify));
router.get('/verify', validate(validateDecodeKey), errorHandle(verify));
router.post(
  '/forgotpassword',
  validate(validateForgotPassword),
  errorHandle(forgotPassword)
);
router.post(
  '/recoverypassword',
  validate(validateRequestRecovery),
  errorHandle(resetPassword)
);
module.exports = router;
