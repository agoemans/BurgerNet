var TweetLocCleanUp = require('../libs/locationfiles/lochelper');

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
	this.tweetCleaner = new TweetLocCleanUp(this.tweetText);
}

Twitterobject.prototype.mainFunction = function() {
	this.tweetCleaner.mainFunct();
	this.crimeType = this.tweetCleaner.crimeType;
	this.streetName = this.tweetCleaner.tempStreet;
};

module.exports = Twitterobject;