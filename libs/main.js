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
	app.get('/api/locations', function(req, res) {
		var getJSON = require('./twitterfiles/twitterwriteresult.js');
		getJSON(req,res);
	});

	/* Test DB connection -- to be used*/
	app.get('/dbtest', function(req, res) {
		var db =  require('../model/initmodel.js');
		var d = new db();
		res.send('connected to db');

	});

	/* Combine Geo and Loc*/
	app.get('/api/geocodes', function(req, res) {
		//todo remove later - add to database
		var getLocJSON = require('./locationfiles/locgeocallback.js');
		getLocJSON(req,res);


	});

}