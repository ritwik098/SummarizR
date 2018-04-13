var MongoClient = require('mongodb').MongoClient
, assert = require('assert')
, ObjectId = require('mongodb').ObjectID;

const config = require('../config/config');
const mongodbUrl = config.mongoDBHost;

function connectToMongo(callback) {
	MongoClient.connect(mongodbUrl, function(err, db) {
	  if (err) {
	    console.log("Error connecting to mongodb");
	  } else {
	    console.log("Connected successfully to database");
	  }

	  callback(err, true);
	  db.close();
	});
}

module.exports = {
	connectToMongo : connectToMongo
}