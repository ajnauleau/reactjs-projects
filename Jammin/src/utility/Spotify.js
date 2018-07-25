import ClientID from '../.private/ClientID.js';
//const redirectURI = 'https://collective.surge.sh';
const redirectURI = 'http://localhost:3000/';

let accessToken = '';

const Spotify = {
  getAccessToken() {
    //const url = 'https://accounts.spotify.com/authorize';

    if (accessToken !== '') {
      console.log('Access token was already set.');
      return accessToken;
    }

    let accessTokenArray = window.location.href.match(/access_token=([^&]*)/);
    let expiresInArray = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenArray && expiresInArray) {
      console.log(
        'Successfully parsing of tokens from URL:\n' +
          accessTokenArray[1] +
          '\n' +
          expiresInArray[1]
      );
      accessToken = accessTokenArray[1];
      let expiresIn = Number(expiresInArray[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      console.log('Redirect to authorize.');
      const endpoint = `https://accounts.spotify.com/authorize?client_id=${ClientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = endpoint;
      return false;
    }
  },

  async search(input) {
    console.log(input);
    const url = `https://api.spotify.com/v1/search?q=${input}&type=track`;
    const apiKey = this.getAccessToken();
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        } else {
          const results = jsonResponse.tracks.items.map(track => ({
            id: track.id,
            uri: track.uri,
            name: track.name,
            //track: item.uri,
            //trackName: item.name,
            //album: track.album.name,
            //albumURI: item.album.uri,
            //albumName: item.album.name,
            artist: track.artists[0].name
            //artistURI: item.artists[0].uri,
            //artistName: item.artists[0].name
          }));
          return results;
        }
        throw new Error('Request Failed!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  getUserID() {
    const apiKey = this.getAccessToken();
    let UserID = '';

    const urlUserEndpoint = 'https://api.spotify.com/v1/me';
    fetch(urlUserEndpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        },
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(jsonResponse => {
        UserID = jsonResponse.id;
        return UserID;
      });
  },

  async savePlaylist(playlistName, URIs) {
    if (playlistName && URIs === true) {
      const apiKey = this.getAccessToken();
      //const headers = { Authorization: `Bearer ${apiKey}` };
      let UserID = '';
      let PlaylistID = '';

      const urlUserEndpoint = 'https://api.spotify.com/v1/me';
      fetch(urlUserEndpoint, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
        .then(
          response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed!');
          },
          networkError => {
            console.log(networkError.message);
          }
        )
        .then(jsonResponse => {
          UserID = jsonResponse.id;
          return jsonResponse.display_name;
        });

      const urlPlaylistEndpoint = `https://api.spotify.com/v1/users/${UserID}/playlists`;
      try {
        const response = await fetch(urlPlaylistEndpoint, {
          method: 'POST',
          body: {
            name: playlistName,
            public: false
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer'
          }
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          PlaylistID = jsonResponse.id;
          return jsonResponse;
        }
        throw new Error('Request Failed!');
      } catch (error) {
        console.log(error);
      }

      const urlTracksEndpoint = `https://api.spotify.com/v1/users/${UserID}/playlists/${PlaylistID}/tracks`;
      try {
        const response = await fetch(urlTracksEndpoint, {
          method: 'POST',
          body: URIs,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse;
        }
        throw new Error('Request Failed!');
      } catch (error) {
        console.log(error);
      }

      return PlaylistID;
    } else {
      return;
    }
  },

  async updatedPlaylistName(playlistName, PlaylistID) {
    const apiKey = this.getAccessToken();
    const UserID = this.getUserID();
    const url = `https://api.spotify.com/v1/users/${UserID}/playlists/${PlaylistID}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: {
          name: playlistName,
          public: false
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error('Request Failed!');
    } catch (error) {
      console.log(error);
    }
  },

  async RemoveFromPlaylist(URIs, PlaylistID) {
    const apiKey = this.getAccessToken();
    const UserID = this.getUserID();
    const url = `https://api.spotify.com/v1/users/${UserID}/playlists/${PlaylistID}`;
    try {
      const arrayURIs = [];
      URIs.map(uri => {
        arrayURIs.push({
          uri: uri
        });
        return arrayURIs; //Not needed?
      });
      const response = await fetch(url, {
        method: 'DELETE',
        body: {
          tracks: arrayURIs
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error('Request Failed!');
    } catch (error) {
      console.log(error);
    }
  }
};

export default Spotify;
