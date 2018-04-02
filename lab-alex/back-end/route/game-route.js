'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('game:game-route');
const List = require('../model/list.js');
const gameRouter = module.exports = new Router();

gameRouter.post('/api/list/:listId/game', jsonParser, function(req, res, next) {
  debug('POST: /api/list/:listId/game');

  List.findByIdAndAddGame(req.params.listId, req.body)
    .then( game => res.json(game))
    .catch(next);
});