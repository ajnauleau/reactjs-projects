
const url = `https://api.spotify.com/v1/\
    users/${user_id}/playlists/${playlist_id}`
    
method: 'PUT',
body :
{
  "name": "New Playlist",
  "public": false
}

status: ({id: 200})

Content-Type: application/json,
Authorization: Bearer
