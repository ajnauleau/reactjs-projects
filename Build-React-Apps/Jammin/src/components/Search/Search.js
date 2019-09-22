
import React, { Component } from 'react';
import './Search.css';

class Search extends Component {

    constructor(props) {
      super(props);
      this.state = {
        items: ''
      };
      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        //this.setState({items: this.props.onSearch});
        this.props.onSearch(this.state.items);
    }

    handleTermChange(e) {
      this.setState({items: e.target.value});
    }

    render() {
      return(
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange}/>
              <a onClick={this.search}>SEARCH</a>
        </div>
      );
    }

};

export default Search;
