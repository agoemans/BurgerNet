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
		//var textCleanUp = require('./texthelper.js');
		//res.send(textCleanUp.fixDate());
		//res.send(textCleanUp.sliceLocation());
	});

	/* Location Cleanup Test -- to remove? */
	app.get('/locClean', function(req, res) {
		var LocationHelper = require('./locationfiles/lochelper.js');
		var locationhelper = new LocationHelper();
		res.send(locationhelper.mainFunct());

	});

	/* Test Geocodes */
	app.get('/GeoCodes', function(req, res) {
		var GeoHelper = require('./locationfiles/geohelper.js');
		var geohelper = new GeoHelper();
		geohelper.mainGeoCall(geohelper.geoCallback, this);
		res.send(geohelper.requestedData);

	});

}