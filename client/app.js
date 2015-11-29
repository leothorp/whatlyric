
//state is: search box input, and search results
//todo: implement "search again?" button that resets the state
var LyricsSearch = React.createClass({
  getInitialState: function() {
    return {
      results: [],
      selectedLyrics: '',
      searchText: '',
      resultClicked: false
    };
  },
  onSearchInput: function(searchInput) {
    this.setState({
      searchText: searchInput
    });
    makeSearchRequest(searchInput, function(results) {
      this.setState({
        results: results
      });
      console.log('search request callback');
    }.bind(this));
  },
  onSongSelection: function(lyricSnippet) {
    this.setState({
      resultClicked: true,
      selectedLyrics: lyricSnippet
    });
  },
  reset: function() {
    this.replaceState(this.getInitialState());
  },
  render: function() {
    var resultsOrSelectedLyrics = this.state.resultClicked ? 
      <SelectedLyrics lyrics={this.state.selectedLyrics} /> : <SearchResults results={this.state.results} onSongSelection={this.onSongSelection} />;
    console.log(this.state.searchText);  
    return (
      <div>
        <SearchBar searchText={this.state.searchText} onSearchInput={this.onSearchInput} />
        <button className="search-again-button" onClick={this.reset}></button>
        {resultsOrSelectedLyrics}
      </div>
    )
  }
});

var SearchBar = React.createClass({
  handleChange: function(event) {
    var userInput = event.target.value;
    this.props.onSearchInput(userInput);

  },
  render: function() {
    return (
      <input type='text' id='search-bar' onChange={this.handleChange} value={this.props.searchText}
        placeholder="What's the name of the song?" />
    )
  }
});

var SearchResults = React.createClass({
  render: function() {
    var resultEntries = this.props.results.map(function(result, index) {
      return (<SongResult song={result} key={index} onSongSelection={this.props.onSongSelection} />);
    }.bind(this));
    return (<ul>{resultEntries}</ul>);
  }
});

var SongResult = React.createClass({
  handleClick: function(event) {
    console.log(this.props.song);
    this.props.onSongSelection(this.props.song.snippet);
  },
  render: function() {
    var song = this.props.song;
    return (
      <li onClick={this.handleClick}>{song.title + ' - ' + song.artist.name}</li>
    );
  }

});

var SelectedLyrics = React.createClass({
  render: function() {
    return (
    <p id="selected-lyrics">{this.props.lyrics}</p>
    );
  }  
});

ReactDOM.render(<LyricsSearch />, document.getElementById('search-container'));


var makeSearchRequest = function(query, callback) {
  var request = new XMLHttpRequest();
  var formattedQueryString = query.split(' ').join('%20');
  var searchURL = 'http://localhost:3000/search?track=' + formattedQueryString;
  request.open('GET', searchURL);
  request.onload = function() {
    console.log('status code: ', this.status);
    console.log(this.response);
    callback(JSON.parse(this.response));
  };

  request.onerror = function() {
    console.log('error');
  }

  request.send();
};




