
import { ClientID } from '../../.private/ClientID.js';

const accessToken = '';
const expiresIn = '';
const url = 'https://accounts.spotify.com/authorize';

const Spotify = {

  getAccessToken() {

      if (accessToken !== '') {

        console.log('Access token was already set.');
        return accessToken;

      } elseif (window.location.href.match('/access_token=([^&]*)/') &&
          window.location.href.match('/expires_in=([^&]*)/')) {

        accessToken = window.location.href.match('/access_token=([^&]*)/');
        expiresIn = window.location.href.match('/expires_in=([^&]*)/');

        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');

        const accessParams = {
          accessToken: accessToken,
          expiresIn: expiresIn
        };

        return accessParams;

      } else {


        async function getKeys() {

          const scopes = "user-read-private playlist-read-private \
            playlist-modify-public playlist-modify-private playlist-read-collaborative";
          const redirectURI = 'http://collective.surge.sh'; //'http://localhost:3000/'
          const requestURL = url + '?response_type=token' + '&client_id=' + ClientID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirectURI));

            //window.location = requestURL; // 'https://accounts.spotify.com/authorize
            // ?client_id=ClientID&response_type=token&scope=playlist-modify-public&redirect_uri=redirect_URI'

          try {

            const response = await fetch(requestURL);

              if (response.ok) {

                const jsonResponse = await response.json();
                const parsedAccessToken = jsonResponse.match('/access_token=([^&]*)/');
                const parsedExpiresIn = jsonResponse.match('/expires_in=([^&]*)/');

                return accessToken = parsedAccessToken;
                return expiresIn = parsedExpiresIn;

                const accessParams = {
                  accessToken: parsedAccessToken,
                  expiresIn: parsedExpiresIn
                };

                return accessParams;

              }

              throw new Error('Request Failed');

          } catch (error) {

            console.log(error);

          }
        }
      }
    };

  search(input) {
    const url = `https://api.spotify.com/v1/search?q=${input}\
      &type=track&limit=33`;
    const apiKey = accessToken;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
        response.json()
      }).then(jsonResponse => {
        if(jsonResponse.tracks.items) {
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
   }

savePlaylist(playlistName, URIs) {

  if(playlistName && URIs == true) {

    const apiKey = this.getAccessToken();
    const headers = Authorization: `Bearer ${apiKey}`;
    const UserID = '';

    const url = 'https://api.spotify.com/v1/me';
    fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      UserID = jsonResponse.id;
    	return jsonResponse.display_name;
    });

    async createdNewPlaylist(playlistName) {
      const url = `https://api.spotify.com/v1/\
        users/${UserID}/playlists`
      try {
        const response = await fetch(url, {
          method: 'POST',
          body :
          {
            "name": playlistName,
            "public": false
          },
          headers: {
            Content-Type: application/json,
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
    };

    async updatedPlaylistTracks(URIs) {
      const url = `https://api.spotify.com/v1/\
          users/${UserID}/playlists/${playlistID}/tracks`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: URIs,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Content-Type: application/json
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
    };

    async updatedPlaylistName(playlistName) {
      const url = `https://api.spotify.com/v1/\
          users/${userID}/playlists/${playlistID}`;
      try {
        const response = await fetch('url', {
          method: 'PUT',
          body:
          {
            "name": playlistName,
            "public": false
          },
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Content-Type: application/json
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
    };

    async RemoveFromPlaylist(URIs) {
      const url = `https://api.spotify.com/v1/\
          users/${UserID}/playlists/${playlistID}`;
      try {
        const arrayURIs = []
        URIs.map(uri => {
          arrayURIs.push({
            "uri": uri
          });
        });
        const response = await fetch('url', {
          method: 'DELETE',
          body :
            {
              "tracks": arrayURIs
            },
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Content-Type: application/json
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
    };

  } else {
    return;
  };
 }
};

 export default Spotify;

/*
  const apiCall = async() => {
    try {
      makeCall = await fetch(url, {
          method: 'Post',
          header: `Authorization: Bearer ${your access token}`
      })

      if(response_type.ok == true) {
        return reponse.json();
        throw new Error("Sorry, please try another name.");
      }

    } catch(error) {
      console.log('Network Error')
    };
  };

  const result = apiCall();

  getTrackURIs(result) {
    const urisList = {

    }
  }

  buildObject(result) {
    const queryObject = {
      items: result.tracks.items
    }
    return queryObject;
  };
};

export default Spotify;




  Song

  Base URL: https://api.spotify.com/v1

  GET 	/v1/tracks/{id} 	Get a Track 	track

  return JSON.object

  {
    tracks.items.'0'.name
  }

  Album

  Base URL: https://api.spotify.com/v1

  GET 	/v1/albums/{id} 	Get an Album 	album

  return JSON.object

  {
   tracks.items.'0'.album.name
  }


  Artist

  Base URL: https://api.spotify.com/v1

  GET 	/v1/artists/{id} 	Get an Artist artist

  return JSON.object

  {
  tracks.items.'0'.artists.'0'.name
  }

}


{
  "tracks": {
    "href": "https://api.spotify.com/v1/search?query=the+weekend&type=track&market=US&offset=0&limit=20",
    "items": [
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP"
              },
              "href": "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP",
              "id": "7tYKF4w9nC0nq9CsPZTHyP",
              "name": "SZA",
              "type": "artist",
              "uri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
              },
              "href": "https://api.spotify.com/v1/artists/7CajNmpbOovFoOoasH2HaY",
              "id": "7CajNmpbOovFoOoasH2HaY",
              "name": "Calvin Harris",
              "type": "artist",
              "uri": "spotify:artist:7CajNmpbOovFoOoasH2HaY"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/5enEsi887wD3qGoMCK4jLr"
          },
          "href": "https://api.spotify.com/v1/albums/5enEsi887wD3qGoMCK4jLr",
          "id": "5enEsi887wD3qGoMCK4jLr",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/f71edc4bd18f11f615f070d8d668cdce60d7d375",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ff66d428466bb47f87d86264bd35b83538d389c2",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/bd65b7b5ae7032b637f33d82c45a7013dd2adc70",
              "width": 64
            }
          ],
          "name": "The Weekend (Funk Wav Remix)",
          "release_date": "2017-12-15",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:5enEsi887wD3qGoMCK4jLr"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP"
            },
            "href": "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP",
            "id": "7tYKF4w9nC0nq9CsPZTHyP",
            "name": "SZA",
            "type": "artist",
            "uri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
            },
            "href": "https://api.spotify.com/v1/artists/7CajNmpbOovFoOoasH2HaY",
            "id": "7CajNmpbOovFoOoasH2HaY",
            "name": "Calvin Harris",
            "type": "artist",
            "uri": "spotify:artist:7CajNmpbOovFoOoasH2HaY"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 171805,
        "explicit": false,
        "external_ids": {
          "isrc": "USRC11702939"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0P6AWOA4LG1XOctzaVu5tt"
        },
        "href": "https://api.spotify.com/v1/tracks/0P6AWOA4LG1XOctzaVu5tt",
        "id": "0P6AWOA4LG1XOctzaVu5tt",
        "is_local": false,
        "name": "The Weekend - Funk Wav Remix",
        "popularity": 76,
        "preview_url": "https://p.scdn.co/mp3-preview/215471369e674156c24562a8a49b745fe77b472d?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:0P6AWOA4LG1XOctzaVu5tt"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0P3oVJBFOv3TDXlYRhGL7s"
          },
          "href": "https://api.spotify.com/v1/albums/0P3oVJBFOv3TDXlYRhGL7s",
          "id": "0P3oVJBFOv3TDXlYRhGL7s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/b9dfa7a7a3f69a3869f6fbb77041822f5a76226d",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/32d91abbb59d3b1e6a6bf354a33d8830a3a3530f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/f71facafb4bcce839544cb46a9af6e6540e9c8db",
              "width": 64
            }
          ],
          "name": "Beauty Behind The Madness",
          "release_date": "2015-08-28",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:0P3oVJBFOv3TDXlYRhGL7s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 242253,
        "explicit": true,
        "external_ids": {
          "isrc": "USUG11500737"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/7fBv7CLKzipRk6EC6TWHOB"
        },
        "href": "https://api.spotify.com/v1/tracks/7fBv7CLKzipRk6EC6TWHOB",
        "id": "7fBv7CLKzipRk6EC6TWHOB",
        "is_local": false,
        "name": "The Hills",
        "popularity": 75,
        "preview_url": null,
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:7fBv7CLKzipRk6EC6TWHOB"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP"
              },
              "href": "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP",
              "id": "7tYKF4w9nC0nq9CsPZTHyP",
              "name": "SZA",
              "type": "artist",
              "uri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/76290XdXVF9rPzGdNRWdCh"
          },
          "href": "https://api.spotify.com/v1/albums/76290XdXVF9rPzGdNRWdCh",
          "id": "76290XdXVF9rPzGdNRWdCh",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/056d5d03db611ad1b9f00b1c3d19b7acf989b62e",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/858107cdf591e0257617a751f331f7bc1debcfca",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/160e5177a2c4a63d04f94f848fe88f0f3dbe871c",
              "width": 64
            }
          ],
          "name": "Ctrl",
          "release_date": "2017-06-09",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:76290XdXVF9rPzGdNRWdCh"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP"
            },
            "href": "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP",
            "id": "7tYKF4w9nC0nq9CsPZTHyP",
            "name": "SZA",
            "type": "artist",
            "uri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 272186,
        "explicit": true,
        "external_ids": {
          "isrc": "USRC11701116"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6gU9OKjOE7ghfEd55oRO57"
        },
        "href": "https://api.spotify.com/v1/tracks/6gU9OKjOE7ghfEd55oRO57",
        "id": "6gU9OKjOE7ghfEd55oRO57",
        "is_local": false,
        "name": "The Weekend",
        "popularity": 75,
        "preview_url": "https://p.scdn.co/mp3-preview/4c112b50719f0d39deb0b9f1fa2601eb0555cc73?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 6,
        "type": "track",
        "uri": "spotify:track:6gU9OKjOE7ghfEd55oRO57"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3N88bRVAwQrtKqSV0UgU69"
          },
          "href": "https://api.spotify.com/v1/albums/3N88bRVAwQrtKqSV0UgU69",
          "id": "3N88bRVAwQrtKqSV0UgU69",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/9a1ab63b2e11e622d07f2cd89f33c976743f1fd5",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/d79b68937edf5a273ba8edbf84736fd2039e432f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/10b66d571acc59d5ca655956f36f58f2cefb9d4d",
              "width": 64
            }
          ],
          "name": "My Dear Melancholy,",
          "release_date": "2018-03-30",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3N88bRVAwQrtKqSV0UgU69"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 228373,
        "explicit": false,
        "external_ids": {
          "isrc": "USUG11800560"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4MPTj8lMMvxLwT3EwuXFop"
        },
        "href": "https://api.spotify.com/v1/tracks/4MPTj8lMMvxLwT3EwuXFop",
        "id": "4MPTj8lMMvxLwT3EwuXFop",
        "is_local": false,
        "name": "Call Out My Name",
        "popularity": 87,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:4MPTj8lMMvxLwT3EwuXFop"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
              },
              "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg",
              "id": "2YZyLoL8N0Wb9xBt1NhZWg",
              "name": "Kendrick Lamar",
              "type": "artist",
              "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP"
              },
              "href": "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP",
              "id": "7tYKF4w9nC0nq9CsPZTHyP",
              "name": "SZA",
              "type": "artist",
              "uri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3pLdWdkj83EYfDN6H2N8MR"
          },
          "href": "https://api.spotify.com/v1/albums/3pLdWdkj83EYfDN6H2N8MR",
          "id": "3pLdWdkj83EYfDN6H2N8MR",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/2bd50294b0b2874d3182fa31a6fb825784e6e395",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/844da52d9871ec8fe044eba0746be7717bba838c",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/133d420e24b7236301a968a0011c5fbc3d2365e3",
              "width": 64
            }
          ],
          "name": "Black Panther The Album Music From And Inspired By",
          "release_date": "2018-02-09",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3pLdWdkj83EYfDN6H2N8MR"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
            },
            "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg",
            "id": "2YZyLoL8N0Wb9xBt1NhZWg",
            "name": "Kendrick Lamar",
            "type": "artist",
            "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 211440,
        "explicit": true,
        "external_ids": {
          "isrc": "USUM71800001"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/77UjLW8j5UAGAGVGhR5oUK"
        },
        "href": "https://api.spotify.com/v1/tracks/77UjLW8j5UAGAGVGhR5oUK",
        "id": "77UjLW8j5UAGAGVGhR5oUK",
        "is_local": false,
        "name": "Pray For Me (with Kendrick Lamar)",
        "popularity": 79,
        "preview_url": null,
        "track_number": 14,
        "type": "track",
        "uri": "spotify:track:77UjLW8j5UAGAGVGhR5oUK"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0P3oVJBFOv3TDXlYRhGL7s"
          },
          "href": "https://api.spotify.com/v1/albums/0P3oVJBFOv3TDXlYRhGL7s",
          "id": "0P3oVJBFOv3TDXlYRhGL7s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/b9dfa7a7a3f69a3869f6fbb77041822f5a76226d",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/32d91abbb59d3b1e6a6bf354a33d8830a3a3530f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/f71facafb4bcce839544cb46a9af6e6540e9c8db",
              "width": 64
            }
          ],
          "name": "Beauty Behind The Madness",
          "release_date": "2015-08-28",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:0P3oVJBFOv3TDXlYRhGL7s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 213520,
        "explicit": false,
        "external_ids": {
          "isrc": "USUG11500741"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/22VdIZQfgXJea34mQxlt81"
        },
        "href": "https://api.spotify.com/v1/tracks/22VdIZQfgXJea34mQxlt81",
        "id": "22VdIZQfgXJea34mQxlt81",
        "is_local": false,
        "name": "Can't Feel My Face",
        "popularity": 76,
        "preview_url": null,
        "track_number": 7,
        "type": "track",
        "uri": "spotify:track:22VdIZQfgXJea34mQxlt81"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7c0XG5cIJTrrAgEC3ULPiq"
              },
              "href": "https://api.spotify.com/v1/artists/7c0XG5cIJTrrAgEC3ULPiq",
              "id": "7c0XG5cIJTrrAgEC3ULPiq",
              "name": "Ty Dolla $ign",
              "type": "artist",
              "uri": "spotify:artist:7c0XG5cIJTrrAgEC3ULPiq"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3SHx7bBQFI4J8QRr6D5cOK"
          },
          "href": "https://api.spotify.com/v1/albums/3SHx7bBQFI4J8QRr6D5cOK",
          "id": "3SHx7bBQFI4J8QRr6D5cOK",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/023e60c410e185326b394caa3823b02e8d3e13d6",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/c19ecff803f99ae4e43f5456004feb0627cf7e84",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/0278337d0bed164a4ea0d6d1d31dcac23bca467a",
              "width": 64
            }
          ],
          "name": "Or Nah (feat. The Weeknd, Wiz Khalifa and DJ Mustard) [Remix Version]",
          "release_date": "2014-06-10",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3SHx7bBQFI4J8QRr6D5cOK"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7c0XG5cIJTrrAgEC3ULPiq"
            },
            "href": "https://api.spotify.com/v1/artists/7c0XG5cIJTrrAgEC3ULPiq",
            "id": "7c0XG5cIJTrrAgEC3ULPiq",
            "name": "Ty Dolla $ign",
            "type": "artist",
            "uri": "spotify:artist:7c0XG5cIJTrrAgEC3ULPiq"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0YinUQ50QDB7ZxSCLyQ40k"
            },
            "href": "https://api.spotify.com/v1/artists/0YinUQ50QDB7ZxSCLyQ40k",
            "id": "0YinUQ50QDB7ZxSCLyQ40k",
            "name": "Mustard",
            "type": "artist",
            "uri": "spotify:artist:0YinUQ50QDB7ZxSCLyQ40k"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/137W8MRPWKqSmrBGDBFSop"
            },
            "href": "https://api.spotify.com/v1/artists/137W8MRPWKqSmrBGDBFSop",
            "id": "137W8MRPWKqSmrBGDBFSop",
            "name": "Wiz Khalifa",
            "type": "artist",
            "uri": "spotify:artist:137W8MRPWKqSmrBGDBFSop"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 242983,
        "explicit": true,
        "external_ids": {
          "isrc": "USAT21401391"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/7t2bFihaDvhIrd2gn2CWJO"
        },
        "href": "https://api.spotify.com/v1/tracks/7t2bFihaDvhIrd2gn2CWJO",
        "id": "7t2bFihaDvhIrd2gn2CWJO",
        "is_local": false,
        "name": "Or Nah (feat. The Weeknd, Wiz Khalifa and DJ Mustard) - Remix",
        "popularity": 76,
        "preview_url": "https://p.scdn.co/mp3-preview/70f126c139847335bc03c756c55b80c99892268e?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:7t2bFihaDvhIrd2gn2CWJO"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/2ODvWsOgouMbaA5xf0RkJe"
          },
          "href": "https://api.spotify.com/v1/albums/2ODvWsOgouMbaA5xf0RkJe",
          "id": "2ODvWsOgouMbaA5xf0RkJe",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/cb325fa498e7d386caef89887302d4340c39484c",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/387c963be76db261c25a1811546ac802ebc8f67c",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/b0781582035cdac5685781c3700d1d8bbff5621e",
              "width": 64
            }
          ],
          "name": "Starboy",
          "release_date": "2016-11-25",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:2ODvWsOgouMbaA5xf0RkJe"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi"
            },
            "href": "https://api.spotify.com/v1/artists/4tZwfgrHOc3mvqYlEYSvVi",
            "id": "4tZwfgrHOc3mvqYlEYSvVi",
            "name": "Daft Punk",
            "type": "artist",
            "uri": "spotify:artist:4tZwfgrHOc3mvqYlEYSvVi"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 230453,
        "explicit": true,
        "external_ids": {
          "isrc": "USUG11600976"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"
        },
        "href": "https://api.spotify.com/v1/tracks/7MXVkk9YMctZqd1Srtv4MB",
        "id": "7MXVkk9YMctZqd1Srtv4MB",
        "is_local": false,
        "name": "Starboy",
        "popularity": 81,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:7MXVkk9YMctZqd1Srtv4MB"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/13y7CgLHjMVRMDqxdx0Xdo"
              },
              "href": "https://api.spotify.com/v1/artists/13y7CgLHjMVRMDqxdx0Xdo",
              "id": "13y7CgLHjMVRMDqxdx0Xdo",
              "name": "Gucci Mane",
              "type": "artist",
              "uri": "spotify:artist:13y7CgLHjMVRMDqxdx0Xdo"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/2aTOwGU66ocsf8IQpOI0XZ"
          },
          "href": "https://api.spotify.com/v1/albums/2aTOwGU66ocsf8IQpOI0XZ",
          "id": "2aTOwGU66ocsf8IQpOI0XZ",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/b480a0c2657af7f89e86f4789a13540aef2d16db",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/55823eb40a5a6293320d1a9411306254c5e1c90e",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/39db9ac735df19f9bd2e4619a6e4b03457733eaa",
              "width": 64
            }
          ],
          "name": "Mr. Davis",
          "release_date": "2017-10-13",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:2aTOwGU66ocsf8IQpOI0XZ"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/13y7CgLHjMVRMDqxdx0Xdo"
            },
            "href": "https://api.spotify.com/v1/artists/13y7CgLHjMVRMDqxdx0Xdo",
            "id": "13y7CgLHjMVRMDqxdx0Xdo",
            "name": "Gucci Mane",
            "type": "artist",
            "uri": "spotify:artist:13y7CgLHjMVRMDqxdx0Xdo"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 161989,
        "explicit": true,
        "external_ids": {
          "isrc": "USAT21703236"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/2yuyaYAELoMG4ApV5wJsWR"
        },
        "href": "https://api.spotify.com/v1/tracks/2yuyaYAELoMG4ApV5wJsWR",
        "id": "2yuyaYAELoMG4ApV5wJsWR",
        "is_local": false,
        "name": "Curve (feat. The Weeknd)",
        "popularity": 74,
        "preview_url": "https://p.scdn.co/mp3-preview/af2866feb7d3fab659385406222a6967a5935114?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:2yuyaYAELoMG4ApV5wJsWR"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/5q8HGNo0BjLWaTAhRtbwxa"
              },
              "href": "https://api.spotify.com/v1/artists/5q8HGNo0BjLWaTAhRtbwxa",
              "id": "5q8HGNo0BjLWaTAhRtbwxa",
              "name": "Brantley Gilbert",
              "type": "artist",
              "uri": "spotify:artist:5q8HGNo0BjLWaTAhRtbwxa"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/42YmulIH1BikBWdnqelvnb"
          },
          "href": "https://api.spotify.com/v1/albums/42YmulIH1BikBWdnqelvnb",
          "id": "42YmulIH1BikBWdnqelvnb",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/bd9f747d0ecf4d6ab286fafe8e3ab99fbf8a9592",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/8c4acd1396cf9524eca06399bb1d9c300f924b08",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/9a8cb8ef501df1453dbaba5b2d3f5bdcba1532d2",
              "width": 64
            }
          ],
          "name": "The Devil Don't Sleep",
          "release_date": "2017-01-27",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:42YmulIH1BikBWdnqelvnb"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/5q8HGNo0BjLWaTAhRtbwxa"
            },
            "href": "https://api.spotify.com/v1/artists/5q8HGNo0BjLWaTAhRtbwxa",
            "id": "5q8HGNo0BjLWaTAhRtbwxa",
            "name": "Brantley Gilbert",
            "type": "artist",
            "uri": "spotify:artist:5q8HGNo0BjLWaTAhRtbwxa"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 187760,
        "explicit": false,
        "external_ids": {
          "isrc": "USLXJ1606533"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/48tAdjG4ng2JfECa7OQujk"
        },
        "href": "https://api.spotify.com/v1/tracks/48tAdjG4ng2JfECa7OQujk",
        "id": "48tAdjG4ng2JfECa7OQujk",
        "is_local": false,
        "name": "The Weekend",
        "popularity": 67,
        "preview_url": null,
        "track_number": 3,
        "type": "track",
        "uri": "spotify:track:48tAdjG4ng2JfECa7OQujk"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3N88bRVAwQrtKqSV0UgU69"
          },
          "href": "https://api.spotify.com/v1/albums/3N88bRVAwQrtKqSV0UgU69",
          "id": "3N88bRVAwQrtKqSV0UgU69",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/9a1ab63b2e11e622d07f2cd89f33c976743f1fd5",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/d79b68937edf5a273ba8edbf84736fd2039e432f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/10b66d571acc59d5ca655956f36f58f2cefb9d4d",
              "width": 64
            }
          ],
          "name": "My Dear Melancholy,",
          "release_date": "2018-03-30",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3N88bRVAwQrtKqSV0UgU69"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 220293,
        "explicit": true,
        "external_ids": {
          "isrc": "USUG11800564"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/72TyiiduRmczEbDIEtKQdR"
        },
        "href": "https://api.spotify.com/v1/tracks/72TyiiduRmczEbDIEtKQdR",
        "id": "72TyiiduRmczEbDIEtKQdR",
        "is_local": false,
        "name": "Wasted Times",
        "popularity": 78,
        "preview_url": null,
        "track_number": 3,
        "type": "track",
        "uri": "spotify:track:72TyiiduRmczEbDIEtKQdR"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1RyvyyTE3xzB2ZywiAwp0i"
              },
              "href": "https://api.spotify.com/v1/artists/1RyvyyTE3xzB2ZywiAwp0i",
              "id": "1RyvyyTE3xzB2ZywiAwp0i",
              "name": "Future",
              "type": "artist",
              "uri": "spotify:artist:1RyvyyTE3xzB2ZywiAwp0i"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3jJKDKdlwRS584zUlHV2Ly"
          },
          "href": "https://api.spotify.com/v1/albums/3jJKDKdlwRS584zUlHV2Ly",
          "id": "3jJKDKdlwRS584zUlHV2Ly",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/974348240bd82a665753208268b9958437821f58",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/0c10e5b4eb2c63ceabd1f89d5ef349d8d05482e1",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/55147edeade43780703cdcea8920723f7cdcf692",
              "width": 64
            }
          ],
          "name": "EVOL",
          "release_date": "2016-04-13",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3jJKDKdlwRS584zUlHV2Ly"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1RyvyyTE3xzB2ZywiAwp0i"
            },
            "href": "https://api.spotify.com/v1/artists/1RyvyyTE3xzB2ZywiAwp0i",
            "id": "1RyvyyTE3xzB2ZywiAwp0i",
            "name": "Future",
            "type": "artist",
            "uri": "spotify:artist:1RyvyyTE3xzB2ZywiAwp0i"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 313546,
        "explicit": true,
        "external_ids": {
          "isrc": "USSM11600557"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/7EiZI6JVHllARrX9PUvAdX"
        },
        "href": "https://api.spotify.com/v1/tracks/7EiZI6JVHllARrX9PUvAdX",
        "id": "7EiZI6JVHllARrX9PUvAdX",
        "is_local": false,
        "name": "Low Life",
        "popularity": 76,
        "preview_url": "https://p.scdn.co/mp3-preview/dd493a2d827e0d6b40470f23913f301aee963157?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 10,
        "type": "track",
        "uri": "spotify:track:7EiZI6JVHllARrX9PUvAdX"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3iVFKUpkS32p2YcLMA02u6"
          },
          "href": "https://api.spotify.com/v1/albums/3iVFKUpkS32p2YcLMA02u6",
          "id": "3iVFKUpkS32p2YcLMA02u6",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/239a6b510014280a88f1ee8fcae44c6f7978bb39",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/89d5b8d9dd3c706d0b2ef1358e3baa0265578e69",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/dfcbfefef86da49ad56ef4283ea3849cf910ee4b",
              "width": 64
            }
          ],
          "name": "My Dear Melancholy,",
          "release_date": "2018-03-29",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3iVFKUpkS32p2YcLMA02u6"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 228373,
        "explicit": false,
        "external_ids": {
          "isrc": "USUG11800560"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/1gm616Plq4ScqNi7TVkZ5N"
        },
        "href": "https://api.spotify.com/v1/tracks/1gm616Plq4ScqNi7TVkZ5N",
        "id": "1gm616Plq4ScqNi7TVkZ5N",
        "is_local": false,
        "name": "Call Out My Name",
        "popularity": 75,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:1gm616Plq4ScqNi7TVkZ5N"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/61Ba3txRZWfiX6ZTEZlFCV"
          },
          "href": "https://api.spotify.com/v1/albums/61Ba3txRZWfiX6ZTEZlFCV",
          "id": "61Ba3txRZWfiX6ZTEZlFCV",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ac43f8ec15235d295524246a8ad14f4826708ee2",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/98ae9bc74dbc69328c33c7228df534069fa60287",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/37afc248ffd51a9eca854fb1cd146f9f1ffef372",
              "width": 64
            }
          ],
          "name": "Earned It (Fifty Shades Of Grey) [From The \"Fifty Shades Of Grey\" Soundtrack]",
          "release_date": "2014-12-23",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:61Ba3txRZWfiX6ZTEZlFCV"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 252226,
        "explicit": false,
        "external_ids": {
          "isrc": "USUG11401951"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/2PIvq1pGrUjY007X5y1UpM"
        },
        "href": "https://api.spotify.com/v1/tracks/2PIvq1pGrUjY007X5y1UpM",
        "id": "2PIvq1pGrUjY007X5y1UpM",
        "is_local": false,
        "name": "Earned It (Fifty Shades Of Grey) - From The \"Fifty Shades Of Grey\" Soundtrack",
        "popularity": 72,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:2PIvq1pGrUjY007X5y1UpM"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU"
              },
              "href": "https://api.spotify.com/v1/artists/4gzpq5DPGxSnKTe4SA8HAU",
              "id": "4gzpq5DPGxSnKTe4SA8HAU",
              "name": "Coldplay",
              "type": "artist",
              "uri": "spotify:artist:4gzpq5DPGxSnKTe4SA8HAU"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/5iNrZmtVMtYev5M9yoWpEq"
              },
              "href": "https://api.spotify.com/v1/artists/5iNrZmtVMtYev5M9yoWpEq",
              "id": "5iNrZmtVMtYev5M9yoWpEq",
              "name": "Seeb",
              "type": "artist",
              "uri": "spotify:artist:5iNrZmtVMtYev5M9yoWpEq"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0ezwRysfWCrR5tDgpBwkIw"
          },
          "href": "https://api.spotify.com/v1/albums/0ezwRysfWCrR5tDgpBwkIw",
          "id": "0ezwRysfWCrR5tDgpBwkIw",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/595846b1b208b9edfb91ee79b5b886456856da9f",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/28758cd0b38df6a489937231bc30bcbdd309a755",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/6196f528b365e8ef504fd0706fb7e87adecfe647",
              "width": 64
            }
          ],
          "name": "Hymn For The Weekend (Seeb Remix)",
          "release_date": "2016-03-25",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:0ezwRysfWCrR5tDgpBwkIw"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU"
            },
            "href": "https://api.spotify.com/v1/artists/4gzpq5DPGxSnKTe4SA8HAU",
            "id": "4gzpq5DPGxSnKTe4SA8HAU",
            "name": "Coldplay",
            "type": "artist",
            "uri": "spotify:artist:4gzpq5DPGxSnKTe4SA8HAU"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/5iNrZmtVMtYev5M9yoWpEq"
            },
            "href": "https://api.spotify.com/v1/artists/5iNrZmtVMtYev5M9yoWpEq",
            "id": "5iNrZmtVMtYev5M9yoWpEq",
            "name": "Seeb",
            "type": "artist",
            "uri": "spotify:artist:5iNrZmtVMtYev5M9yoWpEq"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 212647,
        "explicit": false,
        "external_ids": {
          "isrc": "GBAYE1600763"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6s3GEN8wK0OMzzzZbXj0fu"
        },
        "href": "https://api.spotify.com/v1/tracks/6s3GEN8wK0OMzzzZbXj0fu",
        "id": "6s3GEN8wK0OMzzzZbXj0fu",
        "is_local": false,
        "name": "Hymn For The Weekend - Seeb Remix",
        "popularity": 76,
        "preview_url": "https://p.scdn.co/mp3-preview/d36ebf2b3d829b008bfea00bca48536fa510b6f0?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:6s3GEN8wK0OMzzzZbXj0fu"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/5EbpxRwbbpCJUepbqVTZ1U"
          },
          "href": "https://api.spotify.com/v1/albums/5EbpxRwbbpCJUepbqVTZ1U",
          "id": "5EbpxRwbbpCJUepbqVTZ1U",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/cf76867ea5b48b000a237ef7061f58cf0f7aee78",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/1ab3f54010aef456a739907e24c3a2d7e9219467",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/4a13dec355aa72b7e74db8d780c7b02bf8122355",
              "width": 64
            }
          ],
          "name": "Trilogy",
          "release_date": "2012-01-01",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:5EbpxRwbbpCJUepbqVTZ1U"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 312426,
        "explicit": true,
        "external_ids": {
          "isrc": "USUM71212071"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6u0dQik0aif7FQlrhycG1L"
        },
        "href": "https://api.spotify.com/v1/tracks/6u0dQik0aif7FQlrhycG1L",
        "id": "6u0dQik0aif7FQlrhycG1L",
        "is_local": false,
        "name": "The Morning",
        "popularity": 68,
        "preview_url": null,
        "track_number": 4,
        "type": "track",
        "uri": "spotify:track:6u0dQik0aif7FQlrhycG1L"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0P3oVJBFOv3TDXlYRhGL7s"
          },
          "href": "https://api.spotify.com/v1/albums/0P3oVJBFOv3TDXlYRhGL7s",
          "id": "0P3oVJBFOv3TDXlYRhGL7s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/b9dfa7a7a3f69a3869f6fbb77041822f5a76226d",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/32d91abbb59d3b1e6a6bf354a33d8830a3a3530f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/f71facafb4bcce839544cb46a9af6e6540e9c8db",
              "width": 64
            }
          ],
          "name": "Beauty Behind The Madness",
          "release_date": "2015-08-28",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:0P3oVJBFOv3TDXlYRhGL7s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 249040,
        "explicit": true,
        "external_ids": {
          "isrc": "USUG11401323"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4PhsKqMdgMEUSstTDAmMpg"
        },
        "href": "https://api.spotify.com/v1/tracks/4PhsKqMdgMEUSstTDAmMpg",
        "id": "4PhsKqMdgMEUSstTDAmMpg",
        "is_local": false,
        "name": "Often",
        "popularity": 71,
        "preview_url": null,
        "track_number": 4,
        "type": "track",
        "uri": "spotify:track:4PhsKqMdgMEUSstTDAmMpg"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/0FOWNUFHPnMy0vOw1siGqi"
              },
              "href": "https://api.spotify.com/v1/artists/0FOWNUFHPnMy0vOw1siGqi",
              "id": "0FOWNUFHPnMy0vOw1siGqi",
              "name": "Belly",
              "type": "artist",
              "uri": "spotify:artist:0FOWNUFHPnMy0vOw1siGqi"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/4faVpCprX4qgLMgummXUJv"
          },
          "href": "https://api.spotify.com/v1/albums/4faVpCprX4qgLMgummXUJv",
          "id": "4faVpCprX4qgLMgummXUJv",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/21b5dbc373581f2dac84894640eca5be2858e0a4",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/88e64aa59b6e779735ef813a7346d490eeafeff2",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/2155df41f75555f8e171e93baeb6bb0e7e852eb1",
              "width": 64
            }
          ],
          "name": "What You Want (feat. The Weeknd)",
          "release_date": "2018-05-24",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:4faVpCprX4qgLMgummXUJv"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0FOWNUFHPnMy0vOw1siGqi"
            },
            "href": "https://api.spotify.com/v1/artists/0FOWNUFHPnMy0vOw1siGqi",
            "id": "0FOWNUFHPnMy0vOw1siGqi",
            "name": "Belly",
            "type": "artist",
            "uri": "spotify:artist:0FOWNUFHPnMy0vOw1siGqi"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 195920,
        "explicit": true,
        "external_ids": {
          "isrc": "QMJMT1801623"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4RMqA9GixWNB7H6coZFXJN"
        },
        "href": "https://api.spotify.com/v1/tracks/4RMqA9GixWNB7H6coZFXJN",
        "id": "4RMqA9GixWNB7H6coZFXJN",
        "is_local": false,
        "name": "What You Want",
        "popularity": 74,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:4RMqA9GixWNB7H6coZFXJN"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3N88bRVAwQrtKqSV0UgU69"
          },
          "href": "https://api.spotify.com/v1/albums/3N88bRVAwQrtKqSV0UgU69",
          "id": "3N88bRVAwQrtKqSV0UgU69",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/9a1ab63b2e11e622d07f2cd89f33c976743f1fd5",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/d79b68937edf5a273ba8edbf84736fd2039e432f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/10b66d571acc59d5ca655956f36f58f2cefb9d4d",
              "width": 64
            }
          ],
          "name": "My Dear Melancholy,",
          "release_date": "2018-03-30",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3N88bRVAwQrtKqSV0UgU69"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 221106,
        "explicit": false,
        "external_ids": {
          "isrc": "USUG11800562"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4rv1ww0dUwFZcDVPqhcOcX"
        },
        "href": "https://api.spotify.com/v1/tracks/4rv1ww0dUwFZcDVPqhcOcX",
        "id": "4rv1ww0dUwFZcDVPqhcOcX",
        "is_local": false,
        "name": "Try Me",
        "popularity": 77,
        "preview_url": null,
        "track_number": 2,
        "type": "track",
        "uri": "spotify:track:4rv1ww0dUwFZcDVPqhcOcX"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
              },
              "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
              "id": "1Xyo4u8uXC1ZmMpatF05PJ",
              "name": "The Weeknd",
              "type": "artist",
              "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0P3oVJBFOv3TDXlYRhGL7s"
          },
          "href": "https://api.spotify.com/v1/albums/0P3oVJBFOv3TDXlYRhGL7s",
          "id": "0P3oVJBFOv3TDXlYRhGL7s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/b9dfa7a7a3f69a3869f6fbb77041822f5a76226d",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/32d91abbb59d3b1e6a6bf354a33d8830a3a3530f",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/f71facafb4bcce839544cb46a9af6e6540e9c8db",
              "width": 64
            }
          ],
          "name": "Beauty Behind The Madness",
          "release_date": "2015-08-28",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:0P3oVJBFOv3TDXlYRhGL7s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
            },
            "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
            "id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "name": "The Weeknd",
            "type": "artist",
            "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 235653,
        "explicit": true,
        "external_ids": {
          "isrc": "USUG11500951"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/25KybV9BOUlvcnv7nN3Pyo"
        },
        "href": "https://api.spotify.com/v1/tracks/25KybV9BOUlvcnv7nN3Pyo",
        "id": "25KybV9BOUlvcnv7nN3Pyo",
        "is_local": false,
        "name": "In The Night",
        "popularity": 67,
        "preview_url": null,
        "track_number": 10,
        "type": "track",
        "uri": "spotify:track:25KybV9BOUlvcnv7nN3Pyo"
      }
    ],
    "limit": 20,
    "next": "https://api.spotify.com/v1/search?query=the+weekend&type=track&market=US&offset=20&limit=20",
    "offset": 0,
    "previous": null,
    "total": 14239
  }
}
