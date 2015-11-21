var options = require('./options');

function Twitterhelper(){
	this.twitterKey = options.storageConfig.twitterKey;
	this.twitterSecret = options.storageConfig.twitterSecret;
	this.token = options.storageConfig.token;
	this.secret = options.storageConfig.secret;
}

Twitterhelper.prototype.mainCall = function(callback, context){
	callback.call(context, this.oauthCall());
}

Twitterhelper.prototype.oauthCall = function(callback, context){
	var twitterResponse = [];

	var loginData = {
		twitterKey: options.storageConfig.twitterKey,
		twitterSecret: options.storageConfig.twitterSecret,
		token: options.storageConfig.token,
		secret: options.storageConfig.secret
	};

	var OAuth = require('oauth');

	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		this.twitterKey,
		this.twitterSecret,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	oauth.get(
		"https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=WAGRijnsburg&count=5",
		this.token,
		this.secret,
		function (error, data, response) {
			if (error) console.error(error);
			callback.call(context, data);

		}
	);

}

module.exports = Twitterhelper;
