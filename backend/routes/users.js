var express = require('express');
var mongo = require('../utils/mongoDBCalls');
var passport = require('passport');
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
router.get('/', passport.authenticate(['jwt'], { session: false }), function(req, res, next) {
	mongo.getUser(req.user._id, (err, response) => {
		if(err) {
			res.send({error: err})
		}
		else if(response) {
			res.send(JSON.parse(JSON.stringify(response)));
		} else {
			res.send("Error!");
		}
	});
});

module.exports = router;