
var userID = require('../../.private/userid.js').userID;
require('./implicit_grant/app.js');

const my_client_id = userID;

const Authentication = {
  Spotify() {
    app.get('/implicit_grant', function(req, res) {
    var scopes = "user-read-private user-read-email \
        playlist-read-private playlist-modify-public \
        playlist-modify-private playlist-read-collaborative";
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });
  }
}

module.exports = {
  Authentication: Authentication,
};
