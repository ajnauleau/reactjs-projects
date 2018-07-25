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
    if(this.props.playlistTracks) {
      this.setState({ tracks: this.props.playlistTracks });
    } else { this.setState({ tracks: this.props.tracks });
    }
  }

//this.props.playlistTracks not sure ^^



  render() {

if(this.state.tracks) {

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

} else {

    return (
      <div className="Tracklist">
          <Track
            track='Hey there deliala'
            key='33'
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
      </div>
    );
}

  }

}


// could be this.props.tracks

export default Tracklist;
