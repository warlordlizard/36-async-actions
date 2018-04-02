'use strict';

const request = require('superagent');
const List = require('../model/list.js');
const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');
const serverToggle = require('../lib/server-toggle.js');
const server = require('../server.js');

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'test name',
};

describe('List Routes Using Mongo', function() {
  beforeAll( done => {
    serverToggle.serverOn(server, done);
  });
  afterAll( done => {
    serverToggle.serverOff(server, done);
  });
  describe('POST: /api/list', function() {
    describe('with a valid request body', function() {
      afterEach( done => {
        if( this.tempList) {
          List.remove({})
            .then(() => done())
            .catch(done);
          return;
        }
      });
      it('should return a list', done => {
        request.post(`${url}/api/list`)
          .send(exampleList)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test name');
            this.tempList = res.body;
            done();
          });
      });
    });
    describe('with an invalid body', function () {
      it('should respond with a 400', done => {
        request.post(`${url}/api/list`)
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
  });
  describe('GET: /api/list/:listId', function () {
    describe('with a valid id', function() {
      beforeEach( done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      afterEach( done => {
        delete exampleList.timestamp;
        if (this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      console.log('templist:', this.tempList);
      it('should return a list', done => {
        request.get(`${url}/api/list/${this.tempList._id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test name');
            done();
          });
      });
    });
    describe('with an invalid id', function() {
      it('should return not found', function (done) {
        request.get(`${url}/api/list`)
          .end((err, res) => {
            expect(err).toBeTruthy();
            expect(res.status).toEqual(404);
            done();
          });
      });
    });

  });
  describe('PUT: /api/list/:listId', function () {
    describe('with a valid id', function () {
      beforeEach(done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
          .then(list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      afterEach(done => {
        delete exampleList.timestamp;
        if (this.tempList) {
          List.remove({})
            .then(() => done())
            .catch(done);
          return;
        }
        done();
      });
      console.log('templist:', this.tempList);
      it('should return updated list', done => {
        const updatedList = {
          name: 'test name updated',
        };
        request.put(`${url}/api/list/${this.tempList._id}`)
          .send(updatedList)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test name updated');
            done();
          });
      });
    });
    describe('with an invalid id', function () {
      it('should return not found', function (done) {
        const updatedList = {
          name: 'test name updated',
        };
        request.put(`${url}/api/list/:456`)
          .send(updatedList)
          .end((err, res) => {
            expect(err).toBeTruthy();
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
    describe('with an invalid body', function () {
      it('should return bad request', function (done) {
        request.put(`${url}/api/list`)
          .end((err, res) => {
            expect(err).toBeTruthy();
            expect(res.status).toEqual(404);
            done();
          });
      });
    });

  });
});
