// set up
var express        = require('express');
var app            = express();
var port           = process.env.PORT || 8083;
var morgan         = require('morgan');
var bodyParser     = require('body-parser');		
var methodOverride = require('method-override');
var request        = require('request');
var querystring    = require('querystring');
var cookieParser   = require('cookie-parser');

// config
app.use(express.static(__dirname + '/public')); //use static location;
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes
require('./routes.js')(app);


// listen
app.listen(port);
console.log("App listening on port " + port);