'use strict';

//---------------------------------------------------------------------------------
//Description:
//Top level component for the app.
//All application state is stored in this parent element 
//(current search results, lyrics of the song the user clicked,
//text entered in search box, and whether a song has been clicked).

//Component Hierarchy: 
//(indentation indicates a component's depth in the hierarchy.)

//SongSearchMain <--current
  //SearchBar 
  //SearchResults 
    //SongResult 
  //SelectedLyrics 
//---------------------------------------------------------------------------------

var React = require('react');
var SearchBar = require('./SearchBar.js');
var SearchResults = require('./SearchResults.js');
var SelectedLyrics = require('./SelectedLyrics.js');

var SongSearchMain = React.createClass({
 
  getInitialState: function() {
    return {
      results: [],
      selectedLyrics: '',
      searchText: '',
      resultClicked: false
    };
  },

  //update state with user input so that the value in the SearchBar's <input> will update,
  //and send a search request to the server.
  onSearchInput: function(searchInput) {
    this.setState({
      searchText: searchInput
    });
    //if this change is not deleting the only character in the SearchBar, 
    //make a search request, passing updateResults as a callback
    if (searchInput.length > 0) {
      this.makeSearchRequest(searchInput, this.updateResults);
    //clear results display if user has cleared the search bar
    } else {
      this.setState({
        results: []
      });
    }  
  },

  updateResults: function(results) {
    //verify that there is still text in the search box. 
    //If the user deleted it while the request was happening,
    //no need to display the outdated results.
    if (this.state.searchText.length > 0) {
      this.setState({
        results: results
      });
    }
  },

  //change state to indicate that a search result has been clicked, 
  //and set the lyrics to be displayed
  onSongSelection: function(lyricSnippet) {
    this.setState({
      resultClicked: true,
      selectedLyrics: lyricSnippet
    });
  },

  //reset application to initial state when user clicks "Search again?" button
  reset: function() {
    this.replaceState(this.getInitialState());
    document.getElementById('search-bar').focus();
  },
  
  //Send the user's search query to the server, 
  //and pass the results into a callback.
  makeSearchRequest: function(query, callback) {
    var request = new XMLHttpRequest();
    //replace special characters with escape sequences for inclusion in the URL.
    var encodedQueryString = encodeURIComponent(query);
    var searchURL = 'http://localhost:3000/search?track=' + encodedQueryString;
    request.open('GET', searchURL);
    request.onload = function() {
      if (this.status === 200) {
        //response data will be in JSON form
        callback(JSON.parse(this.response)); 
      } else {
        console.log('error: ', this.status);
      }
    };
    request.send();
  },

  render: function() {
    //if the user has clicked on a result, display that result's lyrics
    //and the "Search again?" button.  Otherwise, display the search results and hide the button.
    var resultsOrSelectedLyrics;
    var buttonClasses = 'search-again-button';
    if (this.state.resultClicked) {
      resultsOrSelectedLyrics = (<SelectedLyrics lyrics={this.state.selectedLyrics} />);
    } else {
      //pass props to SearchResults for the current results and the onSongSelection method.
      resultsOrSelectedLyrics = (<SearchResults results={this.state.results} 
        onSongSelection={this.onSongSelection} />);
      buttonClasses += ' hidden';
    }
    //JSX for the top level SongSearchMain component.  
    //contains the SearchBar, the "Search again?" button (initially hidden),
    //and either the search results or the lyrics display.
    return (
      <div>
        <div className="v-h-center">  
          <SearchBar searchText={this.state.searchText} onSearchInput={this.onSearchInput} />
          <div>
            <button className={buttonClasses}
               onClick={this.reset}>Search again?</button>   
          </div>           
        </div>  
        {resultsOrSelectedLyrics}
      </div>
    )
  }
});

module.exports = SongSearchMain;
