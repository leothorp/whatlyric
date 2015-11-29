





var LyricsSearch = React.createClass({
  // getInitialState: function() {
  //   return {
  //     results: [],
  //     selectedSong: null,
  //     searchInput: null
  //   };
  // },
  render: function() {
    return (
      <div>
        <input id="search-bar"



      </div>)
  }


})



ReactDOM.render(<LyricsSearch />, document.getElementById('search-container'));

// var Thing = React.createClass({
//   render: function() {
//     return (<span>Hey {this.props.name}...</span>);
//   }
// });

// var Span = React.createClass({
//   render: function() {
//     return (
//       <span>{this.props.content * 2}</span>
//     );
//   }
// });

// var InputAndSpan = React.createClass({
//   getInitialState: function() {
//     return { content: 2};
//   },
//   updateContent: function(event) {
//     this.setState({content: event.target.value});
//   },
//   render: function() {
//     return (
//       <div>
//         <input onChange={this.updateContent}></input>
//         <Span content={this.state.content} />
//       </div>  
//     )
//   }

// });


// ReactDOM.render(<InputAndSpan />, document.getElementById('container'));

