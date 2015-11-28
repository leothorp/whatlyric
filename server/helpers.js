'use strict';

var request = require('request');
var lyricsNMusicKey = require('./serverConfig.js').APIKeys.lyricsNMusic;

//http://api.lyricsnmusic.com/songs?api_key=[YOUR_API_KEY]&q=Coldplay%20Clocks

var fetchSearchResults = function(res, query, callback) {
  var APICallURL = buildAPICallURL(query);
  //search for matches in the lyric database using the MusicNLyrics API
  request(APICallURL, function(error, response, body) {
    if (error) {
      console.log(error);
    }
    console.log('api call status code: ', response.statusCode);
    var searchResults = JSON.parse(body);
    //console.log('parsed body: ', JSON.parse(body));
    callback(res, searchResults);
  });
};

var buildAPICallURL = function(query) {
  return 'http://api.lyricsnmusic.com/songs?api_key=' + lyricsNMusicKey + '&track=' + query;
};

module.exports = {
  fetchSearchResults: fetchSearchResults
};