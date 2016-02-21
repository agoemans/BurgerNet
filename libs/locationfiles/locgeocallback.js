module.exports = function(req,res){
	var LocationHelper = require('./lochelper.js');
	var GeoHelper = require('./geohelper.js');

	var locationhelper = new LocationHelper();
	var geohelper = new GeoHelper(locationhelper.mainFunct());

	geohelper.run(function(data){
		res.json(data.results[0].geometry.location);
	}, this);

}
