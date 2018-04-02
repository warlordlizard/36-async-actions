'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  genre: { type: String, required: true },
  listId: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('game', gameSchema);