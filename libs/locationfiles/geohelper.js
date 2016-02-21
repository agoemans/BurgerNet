var https = require('https')

function Geohelper(){
	this.url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

	//todo : this is just for test, remove when db is in place
	//this.region = location + ', Leiden';
	//this.url = this.url + this.region;
	this.requestedData = 'None';
}

Geohelper.prototype.run = function(){
	//todo delete
	// This is the main function
	//this.getGeoCodes(callback, context);
	this.getGeoCodes(this.geoCallback,this);
};


Geohelper.prototype.getGeoCodes = function(location, tweetid, callback, context){
	//console.log(location);
	// todo - store the stuff in a database
	var callback = callback;
	var context = context;

	var region = location + ', Leiden';
	//console.log(region);
	var url = this.url + region;
	//console.log(url);

	https.get(url, function(res){

		//todo if statement for status 200 or log errors
		console.log("Status code " , res.statusCode);
		//console.log("Status code " , res.headers);

		var resultBody = '';
		if(res.statusCode == 200){
			//console.log("res.statusCode statement")
			res.on('data', function(d) {
				//process.stdout.write(d);
				//console.log(d[1].results)
				//console.log(Object.keys(d));
				resultBody += d;

			});

			res.on('end', function(){
				var geoResult = JSON.parse(resultBody);
				geoResult = geoResult.results[0].geometry.location;
				callback.call(context, geoResult, tweetid);
			});
		}


	});
};

Geohelper.prototype.geoCallback = function(data){
	//todo delete
	// todo - store the stuff in a database
	this.requestedData = data;
	//console.log(this.requestedData.results[0].geometry.location);


};

module.exports = Geohelper;
