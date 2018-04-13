var express = require('express');
var router = express.Router();

/**
 * @api {GET} /user Request the user information
 * @apiName Get_User_Information
 * @apiGroup User
 *
 * @apiHeader {String} JWT JWT token of the user.
 *
 * @apiSuccess {JSON} JWT Returns the updated JWT token of the current user.
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
