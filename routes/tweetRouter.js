const express = require('express');
const tweetController = require('../controller/tweetController');
const authController = require('../controller/authController');
const router = express.Router();


router.route('/')
    .post(authController.protectRoutes, tweetController.createTweet)
    .get(authController.protectRoutes, tweetController.getTweetById)
    .patch(tweetController.editTweet)
    .delete(tweetController.deleteTweet);

router.route('/getTweets')
    .post(authController.protectRoutes, tweetController.getTweetById)
module.exports = router;