var Twitterhelper = require('../auth/twitteroauth');
var Twitterobject = require('./twitterobject');
var QueryProcessor = require('../../model/queryprocessor');

function Twitterlist(){
	this.oldTweetList = new Twitterhelper();
	this.queryProcessor = new QueryProcessor();
}

Twitterlist.prototype.createList = function (callback, context) {
	this.onDataReceived = callback;
	this.context = context;

	this.oldTweetList.oauthCall(this.onJsonLoad, this);

	/**/
};

Twitterlist.prototype.onJsonLoad = function(data){
	var twitterResponse = JSON.parse(data);
	var tweetObjectList = [];

	for(var i= 0;i<twitterResponse.length;i++){
		var tweet = new Twitterobject(twitterResponse[i]);
		tweet.mainFunction();
		this.queryProcessor.insertTweets(tweet);
		this.queryProcessor.updateStreetTable(tweet);
		this.queryProcessor.updateCrimeTable(tweet);
		tweetObjectList.push(tweet);
	};

	this.onDataReceived.call(this.context, tweetObjectList);
};

Twitterlist.prototype.insertTweetTable = function(data){
	this.queryProcessor.insertTweets(data);
};

module.exports = Twitterlist;