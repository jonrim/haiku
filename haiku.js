var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
	return fs.readFileSync(file).toString();
}

var syllableData = {};

function formatData(data) {
	var lines = data.toString().split("\n");
	lines.forEach(function(line) {
		lineSplit = line.split(" ");
		var phonemeLayout = "", numOfSyllables = 0;
		for (var i = 2; i < lineSplit.length; i++) {
			phonemeLayout += lineSplit[i] + " ";
			if (lineSplit[i].match(/\d/))
				numOfSyllables++;
			syllableData[lineSplit[0]] = numOfSyllables;
		}

		//console.log("The word " + lineSplit[0] + " has this phoneme layout: " + phonemeLayout + ", # of syllables: " + syllableData[lineSplit[0]]);
	});
}

formatData(cmudictFile);

var syllablesArr = [];

function fillSyllablesArr() {
	for (var i = 0; i < 20; i++) {
		syllablesArr.push([]);
	}
	for (var key in syllableData) {
		// Check if number of syllables is greater than 0
		// This is because the beginning of the file has comments/copyrights
		if (syllableData[key] > 0)
			syllablesArr[syllableData[key] - 1].push(key);
	}
	// console.log("syllables Arr filled");
}

fillSyllablesArr();

function createHaiku(structure) {
	for (var i = 0; i < structure.length; i++) {
		var line = [];
		for (var j = 0; j < structure[i].length; j++) {
			var numOfSyllables = structure[i][j];
			var possibleWords = syllablesArr[numOfSyllables - 1];
			var index = Math.floor(Math.random() * possibleWords.length);
			console.assert(index < possibleWords.length);
			line.push(possibleWords[index]);
		}
		console.log(line.join(" "));
	}
}

module.exports = {
	createHaiku: createHaiku,
};