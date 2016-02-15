var confReader = require('../confReader');
var dbOptions = new confReader('/model/config.json');
var mysql = require("mysql");

function QueryProcessor (){
	this.host = dbOptions.host;
	this.user = dbOptions.user;
	this.password = dbOptions.password;
	this.database =  dbOptions.database;
}

QueryProcessor.prototype.insertTweets = function (data){

	var con = mysql.createConnection({
		host:this.host,
		user:dbOptions.user,
		password:this.password,
		database:this.database
	});

	//todo only for testing, remove this function later

	var tempdate = new Date(data.createdAt);

	var tweet = {idTweet: data.tweetID, TweetText: data.tweetText, createdat: tempdate};

	con.query('INSERT INTO Tweet SET ?', tweet, function(err,res){
		if(err) throw err;
	})
	//this.createUniqueID();

	con.end(function(err){
		//Ends connection
	})

};

QueryProcessor.prototype.updateStreetID = function (){

	var con = mysql.createConnection({
		host:this.host,
		user:dbOptions.user,
		password:this.password,
		database:this.database
	});

	//todo only for testing, remove this function later

	var templist;
	con.query('SELECT * FROM Tweet', function(err,rows){
		if(err) throw err;
		if (!err){
			templist = rows;
			console.log(templist);
		}
	});


	con.end(function(err){
		//Ends connection
	})

	return "hi";
};





module.exports = QueryProcessor;
