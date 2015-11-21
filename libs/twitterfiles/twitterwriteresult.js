module.exports = function(req,res){
	var TweetList= require('./tweetlist.js');
	var tweetlist = new TweetList();

	tweetlist.createList(function(data){
		res.json({search: data});
	}, this);
}
