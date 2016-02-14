function RandomNumberGenerator (){
	this.list = [];
}

RandomNumberGenerator.prototype.tempStarter = function (){
	//todo only for testing, remove this function later
	this.createUniqueID();
	this.createUniqueID();
	this.createUniqueID();
	this.createUniqueID();
	return this.list;
}

RandomNumberGenerator.prototype.createUniqueID = function (){
	//var temp = this.createRandomNumber() + this.createRandomCharacter() + this.createRandomNumber() + this.createRandomCharacter();

	return this.createRandomNumber() + this.createRandomCharacter() + this.createRandomNumber() + this.createRandomCharacter();

	//todo list var is only for testing, remove later
	//this.list.push(temp);
}

RandomNumberGenerator.prototype.createRandomNumber = function (){
	var a = 16807;
	var m = 2147483647;

	var seed = Math.floor( Math.random() * (21 - 1) + 1);
	seed = (a * seed) % m;

	return seed;
}

RandomNumberGenerator.prototype.createRandomCharacter = function(){
	var possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var text = possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
	return text;
};



module.exports = RandomNumberGenerator;
