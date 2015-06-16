

module.exports = function(app) {

	var spotifyServ = require('./services/spotify-serv.js');

	app.post('/', function(req, res) {
		var videoLink = req.body.videoLink;
		console.log(videoLink);

		spotifyServ.callHell(videoLink);
		res.end();

	});

	app.get('/login', function(req, res) {

		spotifyServ.authUser(res);



		
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};