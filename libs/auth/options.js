var confReader = function (filepath){
	var fs = require('fs');
	//configPath =  __dirname + '/config.json';
	configPath =  __dirname + filepath;
	var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
	//exports.storageConfig =  parsed;
	return parsed;
}

module.exports = confReader;

