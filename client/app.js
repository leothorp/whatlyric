'use strict';

//---------------------------------------------------------------------------------
//Description:
//This file contains the entry point for the WhatLyric React app.  

//Component Hierarchy: 
//(indentation indicates a component's depth in the hierarchy.)

//SongSearchMain
  //SearchBar
  //SearchResults
    //SongResult
  //SelectedLyrics

//---------------------------------------------------------------------------------

var React = require('react');
var ReactDOM = require('react-dom');
var SongSearchMain = require('./react_components/SongSearchMain.js');

//Render the top level component into the DOM.
ReactDOM.render(<SongSearchMain />, document.getElementById('search-container'));


