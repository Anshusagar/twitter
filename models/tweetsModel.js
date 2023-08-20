const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweet: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number },
    createdDate: { type: Date }
});


const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;