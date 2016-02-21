var LocationHelper = require('../libs/locationfiles/lochelper');
var confReader = require('../confReader');
var dbOptions = new confReader('/model/config.json');
var mysql = require("mysql");

function QueryProcessor (){
	this.host = dbOptions.host;
	this.user = dbOptions.user;
	this.password = dbOptions.password;
	this.database =  dbOptions.database;
	this.selectResults = null;
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


QueryProcessor.prototype.updateStreetTable = function (data){

	var con = mysql.createConnection({
		host:this.host,
		user:dbOptions.user,
		password:this.password,
		database:this.database
	});

	var streetInfo = {tweetid: data.tweetID, streetName: data.streetName, region:data.region};

	con.query('INSERT INTO streetList SET ?', streetInfo, function(err,res){
		if(err) throw err;
	})

	con.end(function(err){
		//Ends connection
	})

};

QueryProcessor.prototype.updateCrimeTable = function (data){

	var con = mysql.createConnection({
		host:this.host,
		user:dbOptions.user,
		password:this.password,
		database:this.database
	});

	var crimeInfo = {tweetid: data.tweetID, crimeType: data.crimeType};

	con.query('INSERT INTO crimeList SET ?', crimeInfo, function(err,res){
		if(err) throw err;
	})

	con.end(function(err){
		//Ends connection
	})

};


QueryProcessor.prototype.insertGeoData = function (coords, id){

	var con = mysql.createConnection({
		host:this.host,
		user:dbOptions.user,
		password:this.password,
		database:this.database
	});


	console.log(coords, id);
	var geoCodes = {geoCode: {lat:coords.lat, lng: coords.lng}, tweetid: id};

	var point = 'POINT(' + coords.lat + ' ' + coords.lng  + ')';
	console.log(point)
	var inserts = ['geoCode', point, 'tweetid', id]

	con.query('UPDATE streetList SET ?? = GeomFromText(?) where ?? = ?', inserts, function(err,res){
		if(err) throw err;
	})

	con.end(function(err){
		//Ends connection
	})

};


QueryProcessor.prototype.getSearchResults = function (callback, context){
	var con = mysql.createConnection({
		host:this.host,
		user:dbOptions.user,
		password:this.password,
		database:this.database
	});

	//todo only for testing, remove this function later

	var templist = [];
	con.query('SELECT streetName, tweetid FROM streetList where streetName is not null', function(err,rows){
		if(err) throw err;
		if (!err) {
			templist = rows;
			callback.call(context, rows);
		}

	});

	con.end(function(err){
		//Ends connection
	})

};

QueryProcessor.prototype.updateAdditionalTables = function (){
	this.getSearchResults(this.onQueryLoad, this);
};

QueryProcessor.prototype.onQueryLoad = function (content){
	this.selectResults = content;
	var geoprocessor = require('../libs/locationfiles/geohelper');
	//console.log(this.selectResults);
	for (var i = 0; i < this.selectResults.length; i ++){
		//geoprocessor
		//var locationHolder = new LocationHelper(this.selectResults[i]);
		//locationHolder.mainFunct();
		//this.updateStreetTable(locationHolder);
		//this.updateCrimeTable (locationHolder);
		console.log(this.selectResults[i].streetName);

	}

};


module.exports = QueryProcessor;

//var s = new QueryProcessor();
//s.updateAdditionalTables()

//
//var geoprocessor = require('../libs/locationfiles/geohelper');
//var geo = new geoprocessor();//'Jan van Houtbrug');
////var geo = new geoprocessor('behulp van een');
//
//loop data
//{
//	geo.getGeoCodes(locString, this.parseGeoCodes, this);
//}
//function parseGeoCodes(data)
//{
//	var location = data.results[0].geometry.location;
//	dbHelper.insert(location);
//}
//console.log(geo.locationCodes);
