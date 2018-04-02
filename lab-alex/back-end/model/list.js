'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('game:list');
const createError = require('http-errors');
const Schema = mongoose.Schema;
const Game = require('./game.js');

const listSchema = Schema({
  name: { type: String, required: true},
  timestamp: { type: Date, required: true},
  games: [{ type: Schema.Types.ObjectId, ref: 'game'}],
});

const List = module.exports = mongoose.model('list', listSchema);

List.findByIdAndAddGame = function(id, game) {
  debug('findByIdAndAddGame');

  return List.findById(id)
    .catch( err => Promise.reject(createError(404, err.message)))
    .then( list => {
      game.listId = list._id;
      this.tempList = list;
      return new Game(game).save();
    })
    .then( game => {
      this.tempList.games.push(game._id);
      this.tempGame = game;
      return this.tempList.save();
    })
    .then( () => {
      return this.tempGame;
    });
};


