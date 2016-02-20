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
}

Twitterobject.prototype.mainFunction = function() {
	var tweetCleaner = new TweetLocCleanUp(this.tweetID, this.tweetText, this.retweeted);
	tweetCleaner.mainFunct();
	this.retweeted = tweetCleaner.retweeted;
	this.crimeType = tweetCleaner.crimeType;
	this.streetName = tweetCleaner.tempStreet;
};

module.exports = Twitterobject;