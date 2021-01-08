const express = require('express');
const morgan = require('morgan');
const cors = require('./cors');
const Router = require('../router');
const app = express();
import passport from 'passport';
import {
  errorConverter,
  errorHandler,
  notFoundHandler,
} from 'middleware/error';
import { jwtStrategy, facebookStrategy, googleStrategy } from 'config/passport';

cors.config(app);
app.enable('trust proxy');
app.use(express.json());
app.use(morgan('dev'));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
passport.use('facebook', facebookStrategy);
passport.use('google', googleStrategy);

//app use router
Router.configRouter(app);

app.use(notFoundHandler);

app.use(errorConverter);

app.use(errorHandler);

export default app;
