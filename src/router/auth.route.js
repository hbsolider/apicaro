import express from 'express';
import validate from 'middleware/validate';
import { oAuth as oAuthLogin } from 'middleware/auth';

import authController from 'controller/auth.controller';
import authValidator from 'validator/auth.validator';

const router = express.Router();

router
  .route('/register')
  .post(validate(authValidator.register), authController.register);

router
  .route('/login')
  .post(validate(authValidator.login), authController.login);

router
  .route('/google')
  .post(
    validate(authValidator.oAuth),
    oAuthLogin('google'),
    authController.oAuth
  );

router
  .route('/facebook')
  .post(
    validate(authValidator.oAuth),
    oAuthLogin('facebook'),
    authController.oAuth
  );

module.exports = router;
