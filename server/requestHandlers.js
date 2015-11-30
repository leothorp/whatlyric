'use strict';

var url = require('url');
var request = require('request');
var helpers = require('./helpers.js');

//will be in form /search?track="SEARCH_TERMS"
var handleSearchRequest = function(req, res) { 
  //parse the url to extract the user's query
  var queryObject = url.parse(req.url, true).query; 
  var searchString = queryObject.track;
  //query the lyrics database.
  fetchAndSendResults(res, searchString);
};

//send a search request to the MusicNLyrics API with the user's query,
//and send the results back to the client.
var fetchAndSendResults = function(res, query) {
  var APICallURL = helpers.buildAPICallURL(query);
  request(APICallURL, function(error, response, body) {
    if (error) {
      console.log('error making API call: ', error);
    }
    console.log('api call status code: ', response.statusCode);
    //if the API server is up, use the results received.
    var searchResults;
    if (response.statusCode === 200) {
      searchResults = JSON.parse(body);     
    //if the API server is down, search the dummy data instead.   
    } else {
      console.log('API server is down, providing dummy data.');
      searchResults = helpers.searchDummyData(query); 
    }
    //send results back to the client as JSON.
    res.json(searchResults);
  });
};

module.exports = {
  handleSearchRequest: handleSearchRequest
};