const Tweet = require('../models/tweetsModel');
const User = require('../models/usersModel')

exports.getTweetById = async (req, res) => {
    const userId = req.body.userId;
    console.log(userId);
    const tweets = await Tweet.find({ userId })

    res.status(200).json({
        status: "Success",
        message: "Got All Tweet",
        data: {
            tweets
        }
    })
}

exports.createTweet = async (req, res) => {
    const newTweet = await Tweet.create({
        tweet: req.body.tweet,
        userId: req.body.userId,
        likes: req.body.likes,
        createdDate: Date.now()
    });


    res.status(201).json({
        status: "Success",
        data: {
            tweet: newTweet
        }
    })
}

exports.editTweet = async (req, res) => {
    const userId = req.body.userId
    const tweet = await Tweet.updateOne({ userId }, { $set: { tweet: req.body.tweet } })

    res.status(201).json({
        status: "Success",
        message: "Edited tweet Successfully",
        data: {
            tweet
        }
    })
}
exports.deleteTweet = async (req, res) => {
    const tweetId = req.body._id;

    const deleteTweet = await Tweet.deleteOne({ _id: tweetId });
    res.status(201).json({
        status: "Success",
        message: "Deleted Successfully",
        data: {
            deleteTweet
        }
    })
}