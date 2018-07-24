import { ClientID } from '../../.private/ClientID.js';

const accessToken = '';
const expiresIn = '';
const url = 'https://accounts.spotify.com/authorize';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      console.log('Access token was already set.');
      return accessToken;
    }

    let accessTokenArray = window.location.href.match('/access_token=([^&]*)/');
    let expiresInArray = window.location.href.match('/expires_in=([^&]*)/');

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

      const accessParams = {
        accessToken: accessToken,
        expiresIn: expiresIn
      };

      return accessToken;
    } else {
      const scopes =
        'user-read-private playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative';
      const redirectURI = 'http://collective.surge.sh'; //'http://localhost:3000/'
      const requestURL =
        url +
        '?response_type=token' +
        '&client_id=' +
        ClientID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectURI);

      //window.location = requestURL; // 'https://accounts.spotify.com/authorize
      // ?client_id=ClientID&response_type=token&scope=playlist-modify-public&redirect_uri=redirect_URI'

      try {
        const response = fetch(requestURL); //await

        if (response.ok) {
          const jsonResponse = response.json(); //await
          const parsedAccessToken = jsonResponse.match(
            '/access_token=([^&]*)/'
          );
          const accessParams = {
            accessToken: parsedAccessToken,
            expiresIn: parsedExpiresIn
          };

          return (accessToken = parsedAccessToken[1]);
        }

        throw new Error('Request Failed');
      } catch (error) {
        console.log(error);
      }
    }
  },

  async search(input) {
    const url = `https://api.spotify.com/v1/search?q=${input}\
      &type=track&limit=33`;
    const apiKey = accessToken;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(response => {
        response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(item => ({
            id: item.id,
            uri: item.uri,
            name: item.name,
            track: item.uri,
            trackName: item.name,
            album: item.album.name,
            albumURI: item.album.uri,
            albumName: item.album.name,
            artist: item.artists[0].name,
            artistURI: item.artists[0].uri,
            artistName: item.artists[0].name
          }));
        } else {
          return [];
        }
      });
  },

  async savePlaylist(playlistName, URIs) {
    if (playlistName && URIs == true) {
      const apiKey = this.getAccessToken();
      const headers = 'Authorization: `Bearer ${apiKey}`';
      const UserID = '';

      const url = 'https://api.spotify.com/v1/me';
      fetch(url, {
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

      async function createdNewPlaylist(playlistName) {
        const url = `https://api.spotify.com/v1/\
        users/${UserID}/playlists`;
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: {
              name: playlistName,
              public: false
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: Bearer
            }
          });
          if (response.ok) {
            const jsonResponse = await response.json();
            const playlistID = jsonResponse.id;
            return jsonResponse;
          }
          throw new Error('Request Failed!');
        } catch (error) {
          console.log(error);
        }
      }

      async function updatedPlaylistTracks(URIs) {
        const url = `https://api.spotify.com/v1/\
          users/${UserID}/playlists/${playlistID}/tracks`;
        try {
          const response = await fetch(url, {
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
      }

      async function updatedPlaylistName(playlistName) {
        const url = `https://api.spotify.com/v1/\
          users/${userID}/playlists/${playlistID}`;
        try {
          const response = await fetch('url', {
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
      }

      async function RemoveFromPlaylist(URIs) {
        const url = `https://api.spotify.com/v1/\
          users/${UserID}/playlists/${playlistID}`;
        try {
          const arrayURIs = [];
          URIs.map(uri => {
            arrayURIs.push({
              uri: uri
            });
          });
          const response = await fetch('url', {
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
    } else {
      return;
    }
  }
};

export default Spotify;
