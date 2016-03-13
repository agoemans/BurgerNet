
function StreetNameUpdater(){
	this.processTweetText();

}

StreetNameUpdater.prototype.processTweetText = function(){
	var getLocationsFromDB = require('../model/queryprocessor');
	var templocation;
	var locations = new getLocationsFromDB();

	locations.getTweetsForLocationTagging(this.callStreetProcessor, this)

};

StreetNameUpdater.prototype.callStreetProcessor = function(data){
	var lochelper = require('../libs/locationfiles/lochelper');
	var streetNameProcessor = new lochelper();
	for (var i=0; i < data.length; i++){
		//console.log(data[i]);
		streetNameProcessor.tweetText = data[i].TweetText;
		streetNameProcessor.tweetID = data[i].idTweet;
		streetNameProcessor.findStreetNames();
		this.updateStreetTable(streetNameProcessor);
	}

};

StreetNameUpdater.prototype.updateStreetTable = function(obj)
{
	var connectionToDB = require('../model/queryprocessor');
	var updateStreetNameInDB = new connectionToDB();
	updateStreetNameInDB.updateStreetTable(obj);

}


module.exports = StreetNameUpdater;
//var s = new CrimeTagUpdater()

var s = new StreetNameUpdater();

