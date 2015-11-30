'use strict';

//---------------------------------------------------------------------------------
//Description:
//This file contains the React components for the WhatLyric app.  

//Component Hierarchy: 
//(indentation indicates a child of the component on the line immediately above it)

//LyricsSearch
  //SearchBar
  //SearchResults
    //SongResult
  //SelectedLyrics
//---------------------------------------------------------------------------------

var LyricsSearch = React.createClass({
  //all application state is stored in this parent element 
  //(search results, lyrics of the song the user clicked,
  //text entered in search box, and whether a song has been clicked) 
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
    //if this change is not deleting the only character in the searchBar, 
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
    //URL uses %20 to represent spaces
    var formattedQueryString = query.split(' ').join('%20');
    var searchURL = 'http://localhost:3000/search?track=' + formattedQueryString;
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
    //JSX for the top level LyricsSearch component.  
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

//Component for the user to input their song search query.
var SearchBar = React.createClass({
  //pass the user's search box input to the parent component's onSearchInput,
  //which was provided as a prop
  handleChange: function(event) {
    var userInput = event.target.value;
    console.log('change. new userinput: ', userInput);
    this.props.onSearchInput(userInput);
  },
  render: function() {
    return (
      <input type='text' autoFocus='true' className='search-bar' 
        onChange={this.handleChange} value={this.props.searchText}
        placeholder="What's the name of the song?" />
    )
  }
});

//list of all search results
var SearchResults = React.createClass({
  //creates a <ul> of SongResults to display title/artist for each song in the search results.
  render: function() {
    var resultEntries = this.props.results.map(function(result, index) {
      //each SongResult in the list is passed props for its song data, a key for React to keep track
      //of the elements, and the parent component's onSongSelection method to handle user selection
      //of a song
      return (<SongResult song={result} key={index} onSongSelection={this.props.onSongSelection} />);
    }.bind(this));
    return (<ul className='results-list'>{resultEntries}</ul>);
  }
});

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

//Component for displaying the lyrics of a user-selected song.
var SelectedLyrics = React.createClass({
  render: function() {
    return (
    <pre id="selected-lyrics">{this.props.lyrics}</pre>
    );
  }  
});

//Render the top level component into the DOM.
ReactDOM.render(<LyricsSearch />, document.getElementById('search-container'));


