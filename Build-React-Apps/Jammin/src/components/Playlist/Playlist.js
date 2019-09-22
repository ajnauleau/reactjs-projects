import React, { Component } from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist.js';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: this.props.playlistName,
      playlistTracks: this.props.playlistTracks
    };
    this.ChangesNameOfPlaylist = this.ChangesNameOfPlaylist.bind(this);
}

  ChangesNameOfPlaylist(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          defaultValue={'New Playlist'}
          onChange={this.ChangesNameOfPlaylist}
        />

      <Tracklist
          playlistTracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />

        <a class="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

//this.props.playlistTracks

export default Playlist;
