'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var lyricsNMusicKey = require('serverConfig.js').APIKeys.lyricsNMusic;

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '../client');

//routes
app.get('/search/*', handlers.handleSearchRequest);  
//functionality:
//serve front end files
//receive search requests from front end
//query lyricsandmusic API. basic request format is: 
  //http://api.lyricsnmusic.com/songs?api_key=[YOUR_API_KEY]&q=Coldplay%20Clocks
  //API docs: http://www.lyricsnmusic.com/api
//send back to front end

//handler for search request get
//takes content of request, send to urlparser
//parse url for search terms, send on to LAndM API

  //function to make get request to API

//handleAPIResponse - receives and send to front end 

//possible helpers file  