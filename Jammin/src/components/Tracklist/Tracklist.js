import React, { Component } from 'react';
import './Tracklist.css';
import Track from '../Track/Track.js';

class Tracklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: this.props.tracks
    };
    this.renderTracks = this.renderTracks.bind(this);
  }

  renderTracks() {
    this.setState({ tracks: this.props.tracks });
  }

  render() {
    return (
      <div className="Tracklist">
        {
          this.state.tracks.map(track => {
          <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
        })
      }
      </div>
    );
  }
}

export default Tracklist;
