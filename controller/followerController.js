const Follower = require('../models/followerModel')


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