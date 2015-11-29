var https = require('https')

function Geohelper(location){
	this.url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

	//todo : this is just for test, remove when db is in place
	this.region = location + ', Rijnsburg';
	this.url = this.url + this.region;
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

		//todo if statement for status 200 or log errors
		//console.log("Status code " , res.statusCode);
		//console.log("Status code " , res.headers);

		var resultBody = '';

		res.on('data', function(d) {
			//process.stdout.write(d);
			//console.log(d[1].results)
			//console.log(Object.keys(d));
			resultBody += d;

		});

		res.on('end', function(){
			var result = JSON.parse(resultBody);
			callback.call(context, result);
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
