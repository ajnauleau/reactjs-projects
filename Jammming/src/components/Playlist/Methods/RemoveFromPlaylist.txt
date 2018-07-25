
const url = `https://api.spotify.com/v1/\
    users/${user_id}/playlists/${playlist_id}/tracks`

method: 'DELETE',
body :
  {
    "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },
    { "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }]
  }

Content-Type: application/json,
Authorization: Bearer

HTTP/1.1 200 OK
{ "snapshot_id" : "JbtmHBDBAYu3/bt8BOXKjzKx3i0b6LCa/wV\
jyl6qQ2Yf6nFXkbmzuEa+ZI/U1yF+" }
