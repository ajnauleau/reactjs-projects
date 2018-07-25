
import React, { Component } from 'react';
import './App.css';
import Spotify from '../../utility/Spotify.js';
import Playlist from '../Playlist/Playlist.js';
import Results from '../Results/Results.js';
import Search from '../Search/Search.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updateName = this.updateName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    } else {
      let newPlaylistTracks = this.state.playlistTracks;
      newPlaylistTracks.push(track);
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  removeTrack(track) {
    const updatedPlaylistTracks = this.state.playlistTracks.filter(
      savedTrack => savedTrack.id === track.id
    );
    this.setState({ playlistTracks: updatedPlaylistTracks });
  }

  updateName(name) {
    const updatedPlaylistName = name;
    if (this.state.playlistName === updatedPlaylistName) {
      return;
    } else {
      this.setState({ playlistName: updatedPlaylistName });
    }
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.uri;
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  async search(term) {
    try {
      const newSearch = await Spotify.search(term);
      this.setState({ searchResults: newSearch });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>
          Col<span class="highlight">lec</span>tive
        </h1>
        <div className="App">
          <Search onSearch={this.search()}
          />

          <p className="App-intro">
            Welcome to the Best Music Searching Service
          </p>

          <div className="App-playlist">
            <Results
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />

            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onUpdate={this.updateName}
              onNameChange={this.updateName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
