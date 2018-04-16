var express = require('express');
var router = express.Router();
var summarize = require('./../utils/summarizeText');
var request = require('request');
const fs = require('fs');
const config = require('./../config/config');
var path = require('path');

var error_object = {"message" : "Something went wrong"};

var authenticate_string = 'Basic ' + config.deepgram;

router.post('/', (req, res) => {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	
	let file = req.files.file;
	var filename = file.name + '-' + Date.now();

	file.mv(path.join(__dirname, './../resources', filename), function(err) {
		if (err){
		  console.log(err);
		  return res.status(500).send(err);
		}

		request({
		  headers: {
		    'Content-Type': 'video/mp4',
		    'Authorization': authenticate_string
		  },
		  uri: 'https://brain.deepgram.com/speech:recognize',
		  method: 'POST',
		  formData: {
		    'file': fs.createReadStream(path.join(__dirname, './../resources', filename))
		  }
		}, function (err, response, body) {
		  if (err) {
		    console.log(err);
		    res.send(400, error_object);
		  } else {
		  	console.log("body: "+body);
		    var json = JSON.parse(body);
		    summarize.sumarize_text(json.transcript, json.metadata.filename, function(error, response) {
				if (error) {
					res.send(400, error_object);
				} else {
					response.content_url = json.content_url;

					

					res.send(JSON.parse(JSON.stringify(response)));
				}

				fs.unlinkSync(path.join(__dirname, './../resources', filename));
			});
		  }
		});
	});
});

module.exports = router;