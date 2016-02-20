var confReader = require('./../../confReader');
var options = new confReader('/libs/auth/config.json');

function Twitterhelper(){
	this.twitterKey = options.twitterKey;
	this.twitterSecret = options.twitterSecret;
	this.token = options.token;
	this.secret = options.secret;
}

Twitterhelper.prototype.mainCall = function(callback, context){
	callback.call(context, this.oauthCall());
}

Twitterhelper.prototype.oauthCall = function(callback, context){
	var twitterResponse = [];

	var loginData = {
		twitterKey: options.twitterKey,
		twitterSecret: options.twitterSecret,
		token: options.token,
		secret: options.secret
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
		"https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=PolLeiden&count=20",
		this.token,
		this.secret,
		function (error, data, response) {
			if (error) console.error(error);
			callback.call(context, data);

		}
	);

}

module.exports = Twitterhelper;
