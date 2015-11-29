function Locationhelper(){
	this.locJSON = "Afgelopen weekend zijn er twee inbraak pogingen " +
	"geweest in Rijnsburg. 1 op de Siegenlaan en 1 op de Collegiantenstraat. Iets gezien?09008844";
	//tempStreet will be removed later, replaced with object
	this.tempStreet = 'None';
	this.crimeType = 'None;'
}

Locationhelper.prototype.mainFunct = function(){
// this is the main function
	this.locationSubStr();
	this.crimeSubStr();

	if (this.tempStreet != null && this.crimeType !=  null) {
		return [this.tempStreet]
	}

};

Locationhelper.prototype.locationSubStr = function(){
// this picks the road - laan, straat or weg
	var re1 = /[A-z]*(straat)/g;
	var re2 = /[A-z]*(laan)/g;
	var re3 = /[A-z]*(weg)/g;

	var regExArray = [re1, re2, re3];

	for(var i = 0; i < regExArray.length; i++) {
		var locHolder = this.locJSON.match(regExArray[i])
		if (locHolder != null) {
			this.tempStreet = locHolder;
		}
	}

};

Locationhelper.prototype.crimeSubStr = function(){
// this looks for crime type
	var re1 = /[A-z]*(inbraak)/g;
	var re2 = /[A-z]*(ingebroken)/g;
	var regExArray = [re1, re2];

	for(var i = 0; i < regExArray.length; i++) {
		var typeHolder = this.locJSON.match(regExArray[i])
		if (typeHolder != null) {
			this.crimeType = typeHolder;
		}
	}

};


Locationhelper.prototype.popRegion = function(){
	//will later take in an input -- removes the Region
	var region = 'Rijnsburg';
	if (this.locJSON.search(region) != -1){
		return this.locJSON.replace(region, '');
	}
};

module.exports = Locationhelper;