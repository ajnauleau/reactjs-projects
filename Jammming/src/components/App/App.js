
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
          id: [],
          name: [],
          artist: [],
          album: []
        }],
      playlistName: 'Playlist',
      playlistTracks: [{
          id: [],
          name: [],
          artist: [],
          album: []
      }]
    };
    //this.fetchTrack = this.fetchTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updateTrack = this.updateTrack.bind(this);
  }

  //fetchTrack() {
    //this.setState({:});
  //}

  addTrack(track) {
    this.setState({:});
    if (this.state.playlistTracks.find(savedTrack =>
          savedTrack.id === track.id )) {
      return;
    } else {
      this.state.playlistTracks.push(track);
    };
  }

  removeTrack(track) {
    const updatedPlaylistTracks =
     this.state.playlistTracks.filter(savedTrack =>
              savedTrack.id === track.id );
     this.setState({playlistTracks: updatedPlaylistTracks});
    };
  }

  updateTrack(name) {
    const updatedPlaylistName = name;
     if(this.state.playlistName === updatedPlaylistName) {
       return;
     } else {
       this.setState({playlistName: updatedPlaylistName});
     }
    };
}

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">

          <!-- Add a Search component -->
          <Search  artist={this.state.artist} track={this.state.track}
             album={this.state.album} input={this.state.input}/>

          <p className="App-intro">
            Welcome to the Best Music Searching Service
          </p>

          <div className="App-playlist">

            <!-- Add a Results component -->
            <Results searchResults={this.state.searchResults}
               onAdd={this.addTrack()} />

            <!-- Add a Playlist component -->
            <Playlist playlistName={this.state.playlistName}
                  playlistTracks={this.state.playlistTracks}
                  onRemove={this.removeTrack()}
                  onUpdate={this.updateTrack()}/>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
