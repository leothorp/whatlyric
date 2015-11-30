'use strict';

//---------------------------------------------------------------------------------
//Description:
//Displays the results of search requests to the server.
//It will update in real time as the user types into the SearchBar.
//Not rendered when SelectedLyrics is present.

//Component Hierarchy: 
//(indentation indicates a component's depth in the hierarchy.)

//SongSearchMain
  //SearchBar 
  //SearchResults <--current
    //SongResult
  //SelectedLyrics
//---------------------------------------------------------------------------------

var React = require('react');
var SongResult = require('./SongResult.js');

//component to display all search results.
var SearchResults = React.createClass({
  //creates a <ul> of SongResults to display title/artist for each song in the search results.
  //each SongResult in the list is passed props for its song data, a key for React to keep track
  //of the elements, and the parent component's onSongSelection method to handle user selection
  //of a song.
  render: function() {
    var resultEntries = this.props.results.map(function(result, index) {
      return (<SongResult song={result} key={index} onSongSelection={this.props.onSongSelection} />);
    }.bind(this));
    return (<ul className='results-list'>{resultEntries}</ul>);
  }
});

module.exports = SearchResults;
