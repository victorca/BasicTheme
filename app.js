var path = require('path'),
	express = require('express'),
	http = require('http'),

	config = require('./config.json');

var app = express();

// Configuration
app.configure(function () {
	app.set('port', config.website.port || process.env.PORT || 3000);

	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());

	// TODO: app.use(express.logger());
	app.use(express.logger('dev'));

	app.use(express.bodyParser());
	app.use(express.methodOverride());

	app.use(express.cookieParser('your secret here'));
	app.use(express.session());

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.locals.pretty = true;
});

app.configure('production', function () {
	app.use(express.errorHandler());
});

// Setup routes
require('./routes/index.js')(app);

var server = http.createServer(app);

server.listen(app.get('port'), function () {
	console.log("Express server listening");
});