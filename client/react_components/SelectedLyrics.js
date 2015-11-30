'use strict';

//---------------------------------------------------------------------------------
//Description:
//This component displays the lyrics of the song the user clicked.
//Not rendered when SearchResults is present.

//Component Hierarchy: 
//(indentation indicates a component's depth in the hierarchy.)

//SongSearchMain
  //SearchBar 
  //SearchResults 
    //SongResult
  //SelectedLyrics <--current
//---------------------------------------------------------------------------------

var React = require('react');

//Component for displaying the lyrics of a user-selected song.
var SelectedLyrics = React.createClass({
  render: function() {
    return (
    <pre className="selected-lyrics">{this.props.lyrics}</pre>
    );
  }  
});

module.exports = SelectedLyrics;