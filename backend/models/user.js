var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    email: String,
    firstname: String,
    lastname: String,
    username: String,
    profilePicture: String,
    pastNotes: [{
    	originalText: String,
    	summarizedText: [String]
    }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;