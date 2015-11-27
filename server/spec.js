'use strict';

var server = require('index.js');
var expect = require('chai').expect;
var request = require('request');

describe('server tests', function() {
  it('should respond to search requests with a 200 status code', function(done) {
    request('http://localhost:3000', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://localhost:3000', function(error, response, body) {
      parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });
});