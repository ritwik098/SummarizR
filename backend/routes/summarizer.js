var express = require('express');
var router = express.Router();
var summarize = require('./../utils/summarizeText');

var error_object = {"message" : "Something went wrong"};

router.post('/', (req, res) => {
	summarize.sumarize_text(req.body.text, req.body.title, function(error, response) {
		if (error) {
			res.send(400, error_object);
		} else {
			res.send(JSON.parse(JSON.stringify(response)));
		}
	});
});

module.exports = router;