
import React, { Component } from 'react';
import 'Results.css';
import Search from '../Search.js';
import Spotify from '../../utility/';

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
