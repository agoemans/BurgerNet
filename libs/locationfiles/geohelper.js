var https = require('https')

function Geohelper(location){
	this.url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

	//todo : this is just for test, remove when db is in place
	this.location = 'Amsterdam';
	this.url = this.url + this.location;
	this.requestedData = 'None';

}

Geohelper.prototype.mainGeoCall = function(callback, context){
	// This is the main function
	this.getGeoCodes(callback, context);
};


Geohelper.prototype.getGeoCodes = function(callback, context){
	// todo - store the stuff in a database
	var callback = callback;
	var context = context;

	https.get(this.url, function(res){
		console.log("Status code " , res.statusCode);
		//console.log("Status code " , res.headers);

		res.on('data', function(d) {
			//process.stdout.write(d);
			//console.log(d[1].results)
			console.log(Object.keys(d));
			callback.call(context, d);
		});

	});
};

Geohelper.prototype.geoCallback = function(data){
	// todo - store the stuff in a database
	this.requestedData = data;
	console.log(this.requestedData);
	return this.requestedData;
};


module.exports = Geohelper;
