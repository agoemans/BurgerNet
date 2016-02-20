function Locationhelper(id, text, retweeted){
	//this.locJSON = "Afgelopen weekend zijn er twee inbraak pogingen " +
	//"geweest in Rijnsburg. 1 op de Siegenlaan en 1 op de Collegiantenstraat. Iets gezien?09008844";
	//tempStreet will be removed later, replaced with object
	this.locJson = text;
	this.tweetID = id;
	this.retweeted = retweeted;
	this.tempStreet = null;
	this.crimeType = null;
}

Locationhelper.prototype.mainFunct = function(){
// this is the main function
//	console.log("inside the locationhelpder funct");
	this.findRetweets();
	this.popRegion();
	this.locationSubStr();
	this.crimeSubStr();

	//if (this.tempStreet != null && this.crimeType !=  null) {
	//	return [this.tempStreet]
	//}

};

Locationhelper.prototype.locationSubStr = function(){
// this picks the road - laan, straat or weg
	var re1 = /[A-z]*(straat)/g;
	var re2 = /[A-z]*(laan)/g;
	var re3 = /[A-z]*(weg)/g;

	var regExArray = [re1, re2, re3];

	for(var i = 0; i < regExArray.length; i++) {
		var locHolder = this.locJson.match(regExArray[i])
		if (locHolder != null) {
			this.tempStreet = locHolder[0];
		}

	}

};

Locationhelper.prototype.crimeSubStr = function(){
// this looks for crime type
	var re1 = /[A-z]*(inbraak)/g;
	var re2 = /[A-z]*(ingebroken)/g;
	var re3 = /[A-z]*(rijding)/g;
	var re4 = /[A-z]*(overval)/g;
	var re5 = /(Steek)\w*/g;
	var regExArray = [re1, re2];

	for(var i = 0; i < regExArray.length; i++) {
		var typeHolder = this.locJson.match(regExArray[i])
		if (typeHolder != null) {
			this.crimeType = typeHolder[0];
		}
	}

};

Locationhelper.prototype.popRegion = function(){
	//will later take in an input -- removes the Region
	//console.log(this.locJson);
	var region = 'Leiden';
	if (this.locJson.search(region) != -1){
		return this.locJson.replace(region, '');
	}
};

Locationhelper.prototype.findRetweets = function(){
	//manually find retweets - don't ask
	var re1 = /(RT)\s(@)/g;
	var typeHolder = this.locJson.match(re1)
	if (typeHolder != null) {
		this.retweeted = true;
	}

};

module.exports = Locationhelper;