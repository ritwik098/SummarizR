var express = require('express');
var router = express.Router();

var speechToText = require('../utils/speechToText');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// src/index.js
router.get('/api/secure', (req, res) => {
    speechToText.speechToText("hjjk");
    res.send("hi");
  }
);

module.exports = router;
