
import React, { Component } from 'react';
import './Results.css';
import Search from '../Search/Search.js';
import Spotify from '../../utility/Spotify.js';
import Tracklist from '../Tracklist/Tracklist.js'

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.props.searchResults
    };
  }

  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>

        <Tracklist tracks={this.state.searchResults}
           onAdd={this.props.onAdd} isRemoval={false} />
        //Could be this.props.searchResults ^^

      </div>
    );
  }
};

export default Results;
