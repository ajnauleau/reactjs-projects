
import React from 'react';
import 'Tracklist.css';

class Tracklist extends  {

  constructor(props) {
    super(props);
    this.state = {
      tracks: this.props.tracks
    };
    this.renderTracks = this.renderTracks.bind(this);
  }

  renderTracks() {
    this.setState({tracks: this.props.tracks})
  }

  render() {
    return (
      <div className="TrackList">
            <Track track={this.state.tracks.map(track => { return track })}
                key={this.state.tracks.map(track => { return track.id })}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval} />
      </div>
    );
  }

}

export default Tracklist;
