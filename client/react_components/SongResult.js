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
    //SongResult <--current
  //SelectedLyrics 
//---------------------------------------------------------------------------------

var React = require('react');

//component for individual songs in the results list. 
//Clicking one will display its lyrics.
var SongResult = React.createClass({
  //pass the clicked song's lyrics to the parent component's onSongSelection method.
  handleClick: function(event) {
    console.log(this.props.song);
    this.props.onSongSelection(this.props.song.snippet);
  },
  //creates a clickable <li> displaying the song's title and artist.
  render: function() {
    var song = this.props.song;
    return (
      <li onClick={this.handleClick}>{song.title + ' - ' + song.artist.name}</li>
    );
  }

});

module.exports = SongResult;