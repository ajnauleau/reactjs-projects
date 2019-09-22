import React, { Component } from 'react';
import './Tracklist.css';
import Track from '../Track/Track.js';

class Tracklist extends Component {
  
  render() {
    return (
      <div className="Tracklist">
        {
          this.props.tracks.map(track => (
          <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
        ))
       }
      </div>
    );
  }
}

export default Tracklist;
