'use strict';

var express = require('express');
var handlers = require('./requestHandlers.js');
var app = express();
var port = process.env.PORT || 3000;

//serve client files
app.use(express.static(__dirname + '/../client/build'));
//GET route for search requests
app.get('/search*', handlers.handleSearchRequest);  

app.listen(port);

module.exports = app;