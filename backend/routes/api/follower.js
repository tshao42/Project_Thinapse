const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth,restoreUser } = require ("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');


//who are the user with userId following?
//who are following the user?
router.get('/user/:userId', asyncHandler(async function(req, res) {
    const userId = req.params.userId;
    const following = await db.Follow.findAll({
        include:[{
            model: db.User,
            required:true,
            as: 'follower'
            },
            {
                model: db.User,
                required:true,
                as: 'following'
            }],
        where: {
            followerId: userId
        }
    });
    const followers = await db.Follow.findAll({
        include:[{
            model: db.User,
            required:true,
            as: 'follower'
            },
            {
                model: db.User,
                required:true,
                as: 'following'
            }],
        where: {
            followingId: userId
        }
    });
    return res.json({"followers": followers, "following": following});
}));


//is there the association?
//working
// router.get('/check/:followerId/:followingId', asyncHandler(async function(req,res){
//     const followerId = req.params.followerId;
//     const followingId = req.params.followingId;
//     const following = await db.Follow.findAll({
//         where: {
//             followerId: followerId,
//             followingId: followingId
//         }
//     });
//     return res.json(following);
// }));;

//add the follow
//we are trying to update to the table
//however, when we get back, we want to get the updated status
//of the profile that we are looking at
router.post('/user/:followingId', asyncHandler(async function (req,res){
    const followingId = req.params.followingId;
    const followerId = req.body.followerId;
    //first find if there is existing
    const existing = await db.Follow.findAll({
        include:[{
            model: db.User,
            required:true,
            as: 'follower'
            },
            {
                model: db.User,
                required:true,
                as: 'following'
            }],
        where: {
            followerId: followerId,
            followingId: followingId
        }
    });
    if (existing.length>0){
        return res.json({"followers": existing});
    } else{
        const newFollow = await db.Follow.build(req.body);
        await newFollow.save();
        const followingRelation = await db.Follow.findAll({
            include:[{
                model: db.User,
                required:true,
                as: 'follower'
                },
                {
                    model: db.User,
                    required:true,
                    as: 'following'
                }],
            where: {
                followerId: newFollow.followerId,
                followingId: newFollow.followingId
            }
        });
        res.json({"followers": followingRelation});
    }
}));

//add the delete
router.delete('/:followerId/:followingId', asyncHandler(async function(req,res){
    const followerId = req.params.followerId;
    const followingId = req.params.followingId;
    await db.Follow.destroy({
        where: {
            followerId: followerId,
            followingId: followingId
        }
    })
    return res.json({"deletedFollower": followerId, "deletedFollowing": followingId});
}))


module.exports = router;

