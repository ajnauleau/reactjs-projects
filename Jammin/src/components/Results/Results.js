
import React, { Component } from 'react';
import './Results.css';
import Tracklist from '../Tracklist/Tracklist.js'

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.props.searchResults
    };
    this.renderSearchResults = this.renderSearchResults.bind(this);
  }

  renderSearchResults() {
    this.setState({searchResults: this.props.searchResults});
  }

  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>

        <Tracklist tracks={this.state.searchResults}
           onAdd={this.props.onAdd} isRemoval={false} />


      </div>
    );
  }
};
//Could be this.props.searchResults ^^

export default Results;
