'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errors = require('./lib/error-middleware.js');

const mongoose = require('mongoose');
const debug = require('debug')('game:server');
const listRouter = require('./route/list-route.js');
const gameRouter = require('./route/game-route.js');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(listRouter);
app.use(gameRouter);
app.use(errors);


const server = module.exports = app.listen(PORT, () => {
  debug(`listening on ${PORT}`);
});

server.isRunning = true;