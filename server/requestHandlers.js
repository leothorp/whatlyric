'use strict';

var url = require('url');
var helpers = require('./helpers.js');

var handleSearchRequest = function(req, res) {
  //will be in form /search?track=""
  console.log('parsed URL: ', url.parse(req.url));
  var queryString = url.parse(req.url).query;
  //possibly check here to see if any search terms were actually sent?
  var searchTerm = queryString.split('=')[1];
  console.log('search term: ', searchTerm);

  //call helper function which will query the lyrics database
  helpers.fetchSearchResults(res, searchTerm, sendSearchResults);

};

var sendSearchResults = function(res, results) {
  console.log('inside send search results');
  res.json(results);
};

module.exports = {
  handleSearchRequest: handleSearchRequest
};