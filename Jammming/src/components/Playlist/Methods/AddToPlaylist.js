
const url = `https://api.spotify.com/v1/\
    users/${user_id}/playlists/${playlist_id}/tracks`

method: 'POST',
body :
  {
    "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
      "spotify:track:1301WleyT98MSxVHPZCA6M"]
  }

Content-Type: application/json,
Authorization: Bearer

HTTP/1.1 201 Created
{ "snapshot_id" : "JbtmHBDBAYu3/bt8BOXKjzKx3i0b6\
LCa/wVjyl6qQ2Yf6nFXkbmzuEa+ZI/U1yF+" }
