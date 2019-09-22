
import React, { Component } from 'react';
import './Results.css';
import Tracklist from '../Tracklist/Tracklist.js'

class Results extends Component {

  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>

        <Tracklist tracks={this.props.searchResults}
           onAdd={this.props.onAdd} isRemoval={false} />

      </div>
    );
  }
};
//Could be this.props.searchResults ^^

export default Results;
