function Locationhelper(){
	//this.locJSON = "Afgelopen weekend zijn er twee inbraak pogingen " +
	//"geweest in Rijnsburg. 1 op de Siegenlaan en 1 op de Collegiantenstraat. Iets gezien?09008844";
	//tempStreet will be removed later, replaced with object
	this.tweetText = null;
	this.tweetID = null;
	this.retweeted = null;
	this.tempStreet = null;
	this.crimeType = null;
	this.region = null;
}

Locationhelper.prototype.createHelperProperties = function(id, text, retweeted){
// this is the main function
	this.tweetText = text;
	this.tweetID = id;
	this.retweeted = retweeted;

};

Locationhelper.prototype.processTweetText = function(){
// this is the main function
	this.findRetweets();
	//this.removeRegion();
	this.findStreetNames();
	this.findCrimeReferences();

	//if (this.tempStreet != null && this.crimeType !=  null) {
	//	return [this.tempStreet]
	//}

};

Locationhelper.prototype.findStreetNames = function(){
// this picks the road - laan, straat or weg
	this.removeRegion();
	var re1 = /[A-z]*(straat)/g;
	var re2 = /[A-z]*(laan)/g;
	var re3 = /[A-z]*(weg)/g;
	var re4 = /[A-z]*(brug)/g;
	var re4 = /[A-z]*(gracht)/g;
	var re5 = /([A-z])*\s(van)\s([A-z])*/g;

	var regExArray = [re1, re2, re3, re4, re5];

	for(var i = 0; i < regExArray.length; i++) {
		var locHolder = this.tweetText.match(regExArray[i])
		if (locHolder != null) {
			this.tempStreet = locHolder[0];
		}

	}

};

Locationhelper.prototype.findCrimeReferences = function(){
// this looks for crime type
	var re1 = /[A-z]*(inbraak)/g;
	var re2 = /[A-z]*(ingebroken)/g;
	var re3 = /[A-z]*(rijding)/g;
	var re4 = /[A-z]*(overval)/g;
	var re5 = /(Steek)\w*/g;
	var regExArray = [re1, re2, re3, re4, re5];

	for(var i = 0; i < regExArray.length; i++) {
		var typeHolder = this.tweetText.match(regExArray[i])
		if (typeHolder != null) {
			this.crimeType = typeHolder[0];
		}
	}

};

Locationhelper.prototype.removeRegion = function(){
	//will later take in an input -- removes the Region
	//console.log(this.tweetText);
	var region = 'Leiden';
	if (this.tweetText.search(region) != -1){
		this.region = region;
		return this.tweetText.replace(region, '');
	}
};

Locationhelper.prototype.findRetweets = function(){
	//manually find retweets - don't ask
	var re1 = /(RT)\s(@)/g;
	var typeHolder = this.tweetText.match(re1)
	if (typeHolder != null) {
		this.retweeted = true;
	}

};

module.exports = Locationhelper;