
import React, { Component } from 'react';
import './Search.css';
import Spotify from '../../utility/Spotify.js';

class Search extends Component {

    constructor(props) {
      super(props);
      this.state = {
        items: []
      };
      this.searchSpotify = this.searchSpotify.bind(this);
      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
    }

//    searchResult = this.props.search;
//    input = this.props.input;
/*
    searchSpotify(input) {
      Spotify.search(input).then(items => {
        this.setState({items: items});
    }
*/

    search() {
        this.setState({items: this.props.onSearch});
    }

    handleTermChange(e) {
      this.setState({items: e.target.value});
    }

    render() {
      return(
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange}/>
          <a>SEARCH</a>
        </div>
      );
    }

};

export default Search;
