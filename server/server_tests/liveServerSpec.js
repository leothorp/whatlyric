'use strict';

var expect = require('chai').expect;
var request = require('request');
var express = require('express');
var app = require('../index.js');
var port = 8000;
var server;
describe('live server tests', function() {
  
  before(function(done) {
    server = app.listen(port);
    done();  
  });

  after(function(done) {
    server.close();
    done();
  });

  it('should respond to search requests with a 200 status code', function(done) {
    request('http://localhost:8000/search?track=let', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back an array of song objects', function(done) {
    request('http://localhost:8000/search?track=let', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('array');
      expect(parsedBody[0]).to.be.an('object');
      expect(parsedBody[0].title).to.be.a('string');
      expect(parsedBody[0].snippet).to.be.a('string');
      done();
    });
  });
});