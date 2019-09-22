
var ClientID = require('../../.private/clientsid.js').ClientID;
require('./implicit_grant/app.js');

var my_client_id = ClientID;
var redirect_uri = 'https://spotify.com/';

var Authentication = {
  Spotify() {
    app.get('/login', function(req, res) {
    var scopes = "user-read-private user-read-email \
        playlist-read-private playlist-modify-public \
        playlist-modify-private playlist-read-collaborative";
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + ClientID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });
  }
};

module.exports = {
  Authentication: Authentication,
};
