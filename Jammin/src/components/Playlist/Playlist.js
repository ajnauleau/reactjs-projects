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
    //this.CreateThePlaylist = this.CreateThePlaylist.bind(this);
    this.ChangesNamePlaylist = this.ChangesNamePlaylist.bind(this);
    //this.AddToPlaylist = this.AddToPlaylist.bind(this);
    //this.RemoveFromPlaylist = this.RemoveFromPlaylist.bind(this);
  }

  //CreateThePlaylist(playlistName) { }

  ChangesNameOfPlaylist(e) {
    this.props.onNameChange(e.target.value);
  }

  //AddToPlaylist(uriArray) { }

  //RemoveFromPlaylist() { }

  render() {
    return (
      <div className="Playlist">
        <input
          defaultValue={'New Playlist'}
          onChange={this.ChangesNameOfPlaylist}
        />

      <Tracklist
          playlistTracks={this.state.playlistTracks}
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

export default Playlist;
