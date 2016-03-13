
function GeoUpdater(){
	var lochelper = require('../libs/locationfiles/lochelper');
	var g = require('../libs/locationfiles/geohelper');
	this.getStreetNames();

}

GeoUpdater.prototype.getStreetNames = function(){

	var getLocationsFromDB = require('../model/queryprocessor');
	var templocation;
	var locations = new getLocationsFromDB();
	//locations.getStreetNamesForGeoCoding(function(data){
	//	for (var i=0; i < data.length;i++){
	//		this.callStreetProcessor(data.length[i].streetName, data.length[i].tweetid);
	//	}
	//	console.log(templocation);
	//}, this)

	locations.getStreetNamesForGeoCoding(this.callStreetProcessor, this)

};

GeoUpdater.prototype.callStreetProcessor = function(data){
	//console.log(data)
	var geo = new g();
	for (var i=0; i < data.length;i++){
		//console.log(data[i]);
		geo.getGeoCodes(data[i].streetName, data[i].tweetid, this.parseGeoCodes, this)
	}

};

GeoUpdater.prototype.parseGeoCodes = function(data, id)
{
	var connectionToDB = require('../model/queryprocessor');
	var updateCoordsInDB = new connectionToDB();
	updateCoordsInDB.insertGeoData(data,id);
	//console.log(data, id);
	//var location = data.results[0].geometry.location;

	//dbHelper.insert(location);
}


//module.exports = Twitterobject;
var s = new GeoUpdater()

