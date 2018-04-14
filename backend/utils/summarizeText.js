const config = require('../config/config');
var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const sample_file = require('./SampleTest.txt');

var AYLIENTextAPI = require('aylien_textapi');

var textapi = new AYLIENTextAPI({
  application_id: config.AYLIENTextAPI.application_id,
  application_key: config.AYLIENTextAPI.application_key
});

function sumarize_text(text, title, callback) {
	if (!text) {
		text = sample_file;
	}

	if (!title) {
		title = "Default";
	}

	textapi.summarize({
		'text': text,
		'title' : title,
		'sentences_percentage' : 60
	}, function(error, response) {
	  	callback(error, response);
	});
}

module.exports = {
	sumarize_text : sumarize_text
};