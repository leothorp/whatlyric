'use strict';

var expect = require('chai').expect;
var request = require('request');

//TODO: restructure tests to operate on a single request. 
describe('server tests', function() {
  it('should respond to search requests with a 200 status code', function(done) {
    request('http://localhost:3000/search?songname=test', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back an array of song objects', function(done) {
    request('http://localhost:3000/search?songname=test', function(error, response, body) {
      //console.log(body);
      var parsedBody = JSON.parse(body);
      console.log('parsed body:', parsedBody);
      expect(parsedBody).to.be.an('array');
       expect(parsedBody[0]).to.be.an('object');
      done();
    });
  });
});