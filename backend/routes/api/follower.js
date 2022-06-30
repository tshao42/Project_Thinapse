const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth,restoreUser } = require ("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');


//who are the user with userId following?
router.get('/following/:userId', asyncHandler(async function(req, res) {
    const followerId = req.params.userId;
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
            followerId: followerId
        }
    });
    return res.json(following);
}));

//is there the association?
router.get('/:followerId/:followingId', asyncHandler(async function(req,res){

}));;

//add the follow
router.post('/:followerId/:followingId', asyncHandler(async function (req,res){

}));

//add the delete
router.delete('/:followerId/:followingId', asyncHandler(async function(req,res){

}))


module.exports = router;