'use strict';

const request = require('superagent');
const PORT = process.env.PORT || 3000;
const List = require('../model/list.js');
const Game = require('../model/game.js');
const mongoose = require('mongoose');
const serverToggle = require('../lib/server-toggle.js');
const server = require('../server.js');

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'test list name',
  timestamp: new Date(),
};
const exampleGame = {
  name: 'test game name', 
  genre: 'test game genre', 
  desc: 'test game desc',
};

describe('Game Routes', function() {
  beforeAll( done => {
    serverToggle.serverOn(server, done);
  });
  afterAll( done => {
    serverToggle.serverOff(server, done);
  });

  describe('POST: /api/list/:listId/game', function() {

    describe('with a valid id and game body', () => {
      beforeEach(done => {
        
        new List(exampleList).save()
          .then(list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      afterEach( done => {
        Promise.all([
          List.remove({}),
          Game.remove({}),
        ])
          .then( () => done())
          .catch(done);
      });

      it('should return a game', done => {
        request.post(`${url}/api/list/${this.tempList._id}/game`)
          .send(exampleGame)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.name).toEqual(exampleGame.name);
            expect(res.body.listId).toEqual(this.tempList._id.toString());
            done();
          });
      });
    });
  });
});