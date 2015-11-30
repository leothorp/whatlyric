'use strict';

var lyricsNMusicAPIKey = require('./serverConfig.js').lyricsNMusicAPIKey;
var dummyData = require('./dummyData.js');

//find songs in the dummy data whose titles contain the search string (case insensitive)
var searchDummyData = function(query) {
  var results = dummyData.filter(function(song) {
    return (new RegExp(query, 'i')).test(song.title);
  });
  return results;
};

//URL format for song title search: 
//http://api.lyricsnmusic.com/songs?api_key=[YOUR_API_KEY]&track=Coldplay%20Clocks
var buildAPICallURL = function(query) {
  var encodedQuery = encodeURIComponent(query);
  return 'http://api.lyricsnmusic.com/songs?api_key=' + lyricsNMusicAPIKey + 
    '&track=' + encodedQuery;
};

module.exports = {
  searchDummyData: searchDummyData,
  buildAPICallURL: buildAPICallURL
};