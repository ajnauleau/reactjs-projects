
import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
}


function getSortByClass(sortByOption) {
  if (this.state.sortBy === sortByOption) {
    return 'active';
  } else {
    return '';
  }
}

function handleSortByChange(sortByOption) {
  this.setState({
    sortBy: sortByOption
   });
}

function handleTermChange(event) {
  this.setState({
    term: event.target.value
   });
}

function handleLocationChange(event) {
  this.setState({
    location: event.target.value
   });
}

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    this.handleTermChange =
      this.handleTermChange.bind(this);
    this.handleLocationChange =
      this.handleLocationChange.bind(this);

  }

  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return <li className={getSortByClass(sortByOptionValue)}
         onClick={handleSortByChange.bind(this, sortByOptionValue)}
         key="{sortByOptionValue}">{sortByOption}</li>;
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange()}
             placeholder="Search Businesses" />
           <input onChange={this.handleLocationChange()}
             placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
