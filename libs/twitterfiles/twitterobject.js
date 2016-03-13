var TweetLocCleanUp = require('../locationfiles/lochelper');

function Twitterobject (data){
	//initialize all properties
	this.tweetID = data.id_str;
	this.tweetText = data.text;
	this.retweeted = data.retweeted;
	this.userReply = data.in_reply_to_user_id_str;
	this.createdAt = data.created_at;
	this.location = null;
	this.crimeType = null;
	this.streetName = null;
	this.region = null;

	this.clean();
}

Twitterobject.prototype.clean = function() {
	var tweetCleaner = new TweetLocCleanUp();
	tweetCleaner.createHelperProperties(this.tweetID, this.tweetText, this.retweeted);
	tweetCleaner.processTweetText();
	this.retweeted = tweetCleaner.retweeted;
	this.crimeType = tweetCleaner.crimeType;
	this.streetName = tweetCleaner.tempStreet;
	this.region = tweetCleaner.region;
	//console.log(this.crimeType, this.streetName, this.tweetText);
	//console.log(this.streetName);
};

module.exports = Twitterobject;

//var s = "Aanrijding Jan van Houtbrug. Vanmorgen omstreeks 07.45 uur kreeg de politie de melding te gaan… https://t.co/aXyg3vVVRK"
//var obj = {id_str:123, text:s, retweeted:false}
//var x = new Twitterobject(obj)
//x.clean();