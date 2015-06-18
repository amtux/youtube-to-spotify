

module.exports = function(app) {

	var spotifyServ = require('./services/spotify-serv.js');

	app.post('/', function(req, res) {
		var videoLink = req.body.videoLink;
		console.log('POST / VALUE: ' + videoLink);
		res.end();

	});

	app.get('/login', function(req, res) {
		spotifyServ.authUser(req, res);		
	});

	app.get('/callback', function(req, res) {
		var files = spotifyServ.callbackAuth(req, res);
		
		// console.log(spotifyServ.authToken);
		// res.end();
	});

	app.get('/', function(req, res) {
		res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};