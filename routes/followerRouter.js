const express = require('express');
const followController = require('../controller/followerController');
const authController = require('../controller/authController');
const router = express.Router();


router.route('/')
    .post(followController.followUser)
    .get(followController.getFollowerList);

module.exports = router;