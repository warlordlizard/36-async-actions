'use strict';

const debug = require('debug')('game: error-middleware');
const createError = require('http-errors');

module.exports = function (err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    debug('user error');
    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};