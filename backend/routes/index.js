var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// src/index.js
router.get('/api/secure', (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user));
  }
);

module.exports = router;
