var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    email: String,
    firstname: String,
    lastname: String,
    username: String,
    profilePicture: String,
    pastNotes: [{
    	text: String,
    	sentences: [{
            sentence: String,
            time_stamp: Number
        }],
        content_url: String
    }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;