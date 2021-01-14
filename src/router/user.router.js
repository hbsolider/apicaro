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
  getAllInfo,
} = require('../controller/user.controller');
import {
  validateVerify,
  validateDecodeKey,
  validateForgotPassword,
  validateRequestRecovery,
  validateGetAllInfo,
} from 'validator/user.validator';
import validate from 'middleware/validate';

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
router.get(
  '/:id',
  validate(validateGetAllInfo),
  auth(),
  errorHandle(getAllInfo)
);

module.exports = router;
