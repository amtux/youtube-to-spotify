
var querystring = require('querystring');
var credentials = require('./spotify-credentials.js');

var clientId = credentials.clientId;
var clientSecret = credentials.clientSecret;
var redirectUri = 'http://localhost:8083/callback';

var stateKey = 'spotify_auth_state';

var generateRandomString = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
  	return text;
};


exports.authUser = function(res) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);
	// your application requests authorization
	var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative';
  	res.redirect('https://accounts.spotify.com/authorize?' +
  		querystring.stringify({
      	response_type: 'code',
      	client_id: clientId,
      	scope: scope,
      	redirect_uri: redirectUri,
      	state: state
    }));
};


exports.callHell = function(videoLink) {
	console.log(clientSecret);
};