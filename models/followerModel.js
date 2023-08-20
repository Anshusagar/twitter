const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


const Follower = mongoose.model('Follower', followerSchema);

module.exports = Follower;