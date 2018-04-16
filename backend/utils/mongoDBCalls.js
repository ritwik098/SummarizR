var MongoClient = require('mongodb').MongoClient
, assert = require('assert')
, ObjectId = require('mongodb').ObjectID
, token = require('./token');

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

function checkUserExists(jwt_payload, callback) {
	if (!jwt_payload || !jwt_payload.id) {
	  callback("No user found!", null);
	} else {
	  MongoClient.connect(mongodbUrl, function (err, db) {
	    if (err) {
	      callback("We are currently facing some technically difficulties, please try again later!", null);
	    } else {
	      var dbo = db.db("summarizr");
	      dbo.collection("Users").findOne({'id' : jwt_payload.id}, function(err, result) {
	        if (err) {
	          callback("No user found!", null);
	        } else {
	          if (result) {
	            callback(null, result);
	          } else  {
	            callback(null, false);
	          }
	        }

	        db.close();
	      });
	    }
	  });
	}
}

function addUser(user, callback) {
	if (!user || !user.id) {
	  callback("Error adding the user!", null);
	} else {
	  MongoClient.connect(mongodbUrl, function (err, db) {
	    if (err) {
	      callback("We are currently facing some technically difficulties, please try again later!", null);
	    } else {
	      var dbo = db.db("summarizr");
	      dbo.collection("Users").findOne({'id' : user.id}, function(err, result) {
	        if (err) {
	          callback("Error adding the user!", null);
	        } else {
	          if (result) {
	            callback(null, result);
	          } else  {
	            dbo.collection("Users").insertOne(user, function(err, res) {
	              if (err) {
	                console.log("Error inserting the user : " + user);
	              }
	              db.close();
	            });
	            callback(null, user);
	          }
	        }
	      });
	    }
	  });
	}
}

function updateNotes(user_id, note) {
    if (!user_id || !note) {
      console.log("Error updating the user!");
    } else {
      MongoClient.connect(mongodbUrl, function (err, db) {
        if (err) {
          console.log("We are currently facing some technically difficulties, please try again later!");
        } else {
          var dbo = db.db("summarizr");
          dbo.collection("Users").findOneAndUpdate({'_id': ObjectId(user_id)}, {$push: {pastNotes: note}}, function(err, res) {
              if (err) {
                console.log("Error updating the user!");
              }
              db.close();
            });
        }
      });
    }
}

module.exports = {
	connectToMongo : connectToMongo,
	checkUserExists : checkUserExists,
	addUser : addUser,
	updateNotes: updateNotes
}