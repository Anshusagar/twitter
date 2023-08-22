const Follower = require('../models/followerModel');
const AppError = require('../utils/AppError');


exports.followUser = async (req, res) => {
    const followers = req.body.followers;
    const following = req.body.following;
    if (followers === following) {
        return res.status(404).json({
            status: "Failed",
            message: "Both id cannot be same "
        })
    }
    const newRelationship = await Follower.create({ followers, following });

    res.status(201).json({
        status: "Success new Relation",
        newRelationship
    })

}
exports.unfollowUser = (req, res) => {

}
exports.getFollowerList = async (req, res) => {
    let followers = req.query.userId;
    
    try {
        let follwingList = await Follower.find({ followers });
        console.log(followers);
        res.status(200).json({
            status: "Success",
            data: {
                follwingList
            }
        })
    }
    catch (err) {
        return new AppError("Something went wrong", 404);
    }

}