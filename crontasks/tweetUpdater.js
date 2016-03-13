function TweetUpdater(){
	var TweetList= require('../libs/twitterfiles/tweetlist.js');
	var tweetlist = new TweetList();
	tweetlist.createList();

}

module.exports = new TweetUpdater()

