'use strict';

var express = require('express');
var handlers = require('./requestHandlers.js');
var app = express();

//serve client files
app.use(express.static(__dirname + '/../client/build'));
//GET route for search requests
app.get('/search*', handlers.handleSearchRequest);  

app.listen(3000);

module.exports = app;