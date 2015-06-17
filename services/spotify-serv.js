
var querystring = require('querystring');
var credentials = require('./spotify-credentials.js');
var request        = require('request');

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


exports.authUser = function(req, res) {
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


exports.callbackAuth = function(req, res) {
	var code = req.query.code || null;
  	var state = req.query.state || null;
  	var storedState = req.cookies ? req.cookies[stateKey] : null;

  	if (state === null || state !== storedState) {
    	res.redirect('/#' +
    		querystring.stringify({
        	error: 'state_mismatch'
    	}));
  	} else {
  		res.clearCookie(stateKey);
    	var authOptions = {
    		url: 'https://accounts.spotify.com/api/token', 
      		form: {
        		code: code,
        		redirect_uri: redirectUri,
        		grant_type: 'authorization_code'
      		}, 
      		headers: {
      			'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      		},
      		json: true
   		};

   		request.post(authOptions, function(error, response, body) {
	      	if (!error && response.statusCode === 200) {
	      		var access_token = body.access_token;
	            var refresh_token = body.refresh_token;

	        	var options = {
	          		url: 'https://api.spotify.com/v1/me',
	          		headers: { 'Authorization': 'Bearer ' + access_token },
	          		json: true
	        	};

	        	// use the access token to access the Spotify Web API
	        	request.get(options, function(error, response, body) {
	          		console.log(body);
	        	});
	      		// var result = querystring.stringify({
	      		// 		access_token: access_token,
	      		// 		refresh_token: refresh_token
	      		// 	});
	      		// exports.authToken = access_token;

	        	// we can also pass var result = e token to the browser to make requests from there
	        	// res.redirect('/#' +
          // 			querystring.stringify({
          // 			access_tokens: access_token,
          //   		refresh_tokens: refresh_token
         	//  	}));
	      	} else {
	      		res.redirect('/#' +
	        		querystring.stringify({
	            	error: 'invalid_token'
	          	}));
	      	}
    	});
  	}
	// console.log(req.query.state);
};