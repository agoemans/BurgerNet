module.exports = function(app, express, path)
{
	app.get('/',function(req,res){
		app.use(express.static(__dirname + '/public'));
	});

	/* GET Hello World page. */
	app.get('/helloworld', function(req, res) {
		res.send("Hello World")
	});

	/* Search */
	/*Currently gets twitter resp and displays on screen*/
	//todo - store in db
	app.get('/api/locations', function(req, res) {
		var getJSON = require('./twitterfiles/twitterwriteresult.js');
		getJSON(req,res);

	});

	/* Test DB connection -- to be used*/
	app.get('/dbtest', function(req, res) {
		//var db =  require('../model/initMySql.js');
		//var d = new db();
		//res.send("connecting");

		var updateDB = require('../model/queryprocessor.js');
		var updatedb = new updateDB();

		res.send(updatedb.updateAdditionalTables());

	});

	/* Combine Geo and Loc*/
	app.get('/api/geocodes', function(req, res) {
		//todo remove later - add to database
		var getLocJSON = require('./locationfiles/locgeocallback.js');
		getLocJSON(req,res);
	});

	/* Test Location*/
	app.get('/api/location', function(req, res) {
		//todo remove later - add to database
		var getLocation = require('./locationfiles/lochelper.js');
		var lochelpder = new getLocation("Wij zoeken nu twee mannen omgeving brouwersstraat/Oegstgeesterweg ivm mogelijk inbraak");
		lochelpder.mainFunct();
		res.send(lochelpder.locJson);
	});



}