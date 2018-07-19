
const url = `https://api.spotify.com/v1/\
    users/${user_id}/playlists`

method: 'POST',
body :
{
  "name": "New Playlist",
  "public": false
}

Content-Type: application/json,
Authorization: Bearer
