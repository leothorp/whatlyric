'use strict';

//---------------------------------------------------------------------------------
//Description:
//Takes user input for a song search query.

//Component Hierarchy: 
//(indentation indicates a component's depth in the hierarchy.)

//SongSearchMain
  //SearchBar <--current
  //SearchResults
    //SongResult
  //SelectedLyrics
//---------------------------------------------------------------------------------

var React = require('react');

var SearchBar = React.createClass({
  //pass the user's search box input to the parent component's onSearchInput,
  //which was provided as a prop
  handleChange: function(event) {
    var userInput = event.target.value;
    this.props.onSearchInput(userInput);
  },
  render: function() {
    return (
      <input type='text' autoFocus='true' id='search-bar' 
        onChange={this.handleChange} value={this.props.searchText}
        placeholder="What's the name of the song?" />
    )
  }
});

module.exports = SearchBar;