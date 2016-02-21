var lochelper = require('../libs/locationfiles/lochelper');
var g = require('../libs/locationfiles/geohelper');
function LocationUpdater(){
	this.getStreetNames();

}

LocationUpdater.prototype.getStreetNames = function(){

	var getLocationsFromDB = require('../model/queryprocessor');
	var templocation;
	var locations = new getLocationsFromDB();
	//locations.getSearchResults(function(data){
	//	for (var i=0; i < data.length;i++){
	//		this.callGeoFunction(data.length[i].streetName, data.length[i].tweetid);
	//	}
	//	console.log(templocation);
	//}, this)

	locations.getSearchResults(this.callGeoFunction, this)

};

LocationUpdater.prototype.callGeoFunction = function(data){
	//console.log(data)
	var geo = new g();
	for (var i=0; i < data.length;i++){
		//console.log(data[i]);
		geo.getGeoCodes(data[i].streetName, data[i].tweetid, this.parseGeoCodes, this)
	}

};

LocationUpdater.prototype.parseGeoCodes = function(data, id)
{
	var connectionToDB = require('../model/queryprocessor');
	var updateGeoInDB = new connectionToDB();
	var point = this.Point(data.lat, data.lng);
	updateGeoInDB.updateGeoCodes(point,id);
	console.log(data, id);
	//var location = data.results[0].geometry.location;

	//dbHelper.insert(location);
}

LocationUpdater.prototype.Point = function(x, y)
{
	return (x, y);
}



var s = new LocationUpdater()

