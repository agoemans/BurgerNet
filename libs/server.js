var http = require("http");
var url = require('url');
var express = require("express");
var app = express();
var path    = require("path");


var bodyParser = require("body-parser");


app.use(express.static('public'));

require('./main')(app, express, path);


app.listen(8888,function(){
	console.log('Server running at http://127.0.0.1:8888/');
});


module.exports = app;
