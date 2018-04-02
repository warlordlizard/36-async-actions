'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('game:list-route');
const List = require('../model/list.js');
const listRouter = module.exports = new Router();
const createError = require('http-errors');

listRouter.get('/api/list/:listId', function(req, res, next) {
  debug('GET: /api/list/:listId');
  if (!req.params.listId) return next(createError(404, 'not found'));

  List.findById(req.params.listId)
    .populate('games')
    .then( list => res.json(list))
    .catch(next);
});

listRouter.post('/api/list', jsonParser, function(req, res, next) {
  debug('POST: /api/list');
  if (!req.body.name) return next(createError(400, 'bad request'));
  req.body.timestamp = new Date();
  new List(req.body).save()
    .then( list => res.json(list))
    .catch(next);
});

listRouter.delete('/api/list/:listId', function(req, res, next) {
  debug('DELETE: /api/list/:listId');
  if(!req.params.listId) return next(createError(404, err.message));

  List.findByIdAndRemove(req.params.listId)
    .then(() => res.send(204))
    .catch(next);
});
listRouter.put('/api/list/:listId', jsonParser, function(req, res, next) {
  debug('PUT: /api/list/:listId');
  // if (!req._id) return next(createError(404, 'not found'));
  if (!req.params.listId) return next(createError(400, 'bad request'));
  
  List.findByIdAndUpdate(req.params.listId, req.body, {new: true})
    .then(list => res.json(list))
    .catch(err => {
      if (err.name === 'ValidationError') return next(err);
      next(createError(404, err.message));
    });
});

