var confReader = require('../confReader');
var dbOptions = new confReader('config.json');
var mysql = require("mysql");

var initConnect = function (){
	//Create connections
	var con = mysql.createConnection({
		host: dbOptions.host,
		user: dbOptions.user,
		password:dbOptions.password,
		database: dbOptions.database
	});

	con.connect(function(err){
		if(err){
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
	con.end(function(err){
		//Ends connection
	})
};

module.exports = initConnect;
