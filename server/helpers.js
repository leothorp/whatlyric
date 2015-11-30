'use strict';

var request = require('request');
var lyricsNMusicKey = require('./serverConfig.js').APIKeys.lyricsNMusic;

var dummyData = [
  {
    title: 'API_SERVER_IS_DOWN',
    snippet: 'this is all dummy data',
    artist: {
      name: 'Sysadmin'
    }   
  }, 
  {
    title: 'Let it Be',
    snippet: 'When I find myself in times of trouble, Mother Mary comes to me\n' +
      'Speaking words of wisdom, let it be\n' +
      'And in my hour of darkness she is standing right in front of me\n' +
      'Speaking words of wisdom, let it be\n' +
      'Let it be, let it be, let it be, let it be\n' +
      'Whisper words of wisdom, let it be\n',
    artist: {
      name: 'The Beatles'
    }   
  }, 
  {
    title: 'Lot it Bo',
    snippet: 'When I find myself in times of trouble, Mother Mary comes to me\n' +
      'Speaking words of wisdom, let it be\n' +
      'And in my hour of darkness she is standing right in front of me\n' +
      'Speaking words of wisdom, let it be\n' +
      'Let it be, let it be, let it be, let it be\n' +
      'Whisper words of wisdom, let it be\n',
    artist: {
      name: 'The Boles'
    }   
  }, 
  {
    title: 'Let\'s Stay Together',
    snippet: 'I, I\'m so in love with you\n' +
      'Whatever you want to do is all right with me\n' +
      'Cause you make me feel so brand new\n' +
      'And I want to spend my life with you\n',
    artist: {
      name: 'Al Green'
    }   
  }, 
]


var fetchSearchResults = function(res, query, callback) {
  var APICallURL = buildAPICallURL(query);
  //search for matches in the lyric database using the MusicNLyrics API
  request(APICallURL, function(error, response, body) {
    if (error) {
      console.log('error: ', error);
    }
    console.log('api call status code: ', response.statusCode);
    var searchResults;
    if (response.statusCode === 200) {
      searchResults = JSON.parse(body);      
    } else {
      var queryWithDecodedSpaces = query.split('%20').join(' ');
      searchResults = searchDummyData(queryWithDecodedSpaces);
      console.log('API server is down, providing dummy data.');
    }
    callback(res, searchResults);
  });
};

var searchDummyData = function(query) {
  // if (query.length === 0) {
  //   return [];
  // }
  var results = dummyData.filter(function(song) {
    return (new RegExp(query, 'i')).test(song.title);
  });
  return results;
};

// URL format for song title search: 
//http://api.lyricsnmusic.com/songs?api_key=[YOUR_API_KEY]&track=Coldplay%20Clocks
var buildAPICallURL = function(query) {
  return 'http://api.lyricsnmusic.com/songs?api_key=' + lyricsNMusicKey + '&track=' + query;
};

module.exports = {
  fetchSearchResults: fetchSearchResults
};