function Twitterobject (data){
	//initialize all properties
	this.tweetText = data.text;
	this.retweeted = data.retweeted;
	this.userReply = data.in_reply_to_user_id_str;
	this.createdAt = data.created_at;
	this.location = 'None';
}

Twitterobject.prototype.log = function() {
	console.log(this.tweetText);
};

module.exports = Twitterobject;