const express = require('express');
const morgan = require('morgan');
const cors = require('./cors')
const Router = require('../router');
const app = express();
cors.config(app);
app.enable('trust proxy');
app.use(express.json());
app.use(morgan('dev'));
//app use router
Router.configRouter(app);

module.exports = app;
