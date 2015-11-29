'use strict';

var express = require('express');
//var bodyParser = require('body-parser');

var lyricsNMusicKey = require('./serverConfig.js').APIKeys.lyricsNMusic;
var handlers = require('./requestHandlers.js');

var app = express();

//app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
console.log(__dirname);
//routes
app.get('/search*', handlers.handleSearchRequest);  
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

//cache results of most recent search; no need to query the API twice 

app.listen(3000);