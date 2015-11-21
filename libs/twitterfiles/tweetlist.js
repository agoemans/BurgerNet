var Twitterhelper = require('../auth/twitteroauth');
var Twitterobject = require('./twitterobject');

function Twitterlist(){
	this.oldTweetList = new Twitterhelper();
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
		tweetObjectList.push(tweet);
	};

	this.onDataReceived.call(this.context, tweetObjectList);
};

module.exports = Twitterlist;