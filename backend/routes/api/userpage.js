const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth,restoreUser } = require ("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models')


//this will be accessed through/api/userinfo
//TODO:
//get posts of the author
//GET ROUTE
router.get('/:id(\\d+)', asyncHandler(async function(req, res) {
    const userId = req.params.id;
    console.log("Hit USER INDIVIDUAL PAGE Route!");
    const posts = await db.Post.findAll({
        where:
        {authorId: userId}
    }); //need to do limit
   return res.json(posts);
}));


//=============for following==========
//GET ROUTE
//get *following* of the author
router.get('/:id(\\d+)/following', asyncHandler(async function(req,res){
    const userId = req.params.id;
    console.log("Hits FOLLOWING ROUTE!");
    const following = await (db.Follow.findAll({
        where:
        {followerId: userId}
    }));
    if (following!== undefined){
        return res.json(following);
    } else {
        return res.json();  //this will return an empty array
    }
}))



//GET ROUTE to understand the status of following
//GET ROUTE
//show the status if logged in
router.get('/:id(\\d+)/followingstatus',
    restoreUser,
    asyncHandler(async function(req,res){
        //get current User Id
        const { user } = req;
        //if not logged in, do not show the button
        if (!user) {
            return undefined;
        } else{
        //set current user
        const currentUser = user.toSafeObject()
        const userId =req.params.id;
        const ownId = currentUser.id;
        //if looking at own page, do not show the button
        //========TODO: prolly do this on render page==========
        // if (userId===ownId) return res.json({message: "NA"});
        console.log(`CHECKPOINT FOR FOLLOWINGSTATUS ${ownId}`)
        //now find the relation
        const myFollow = await db.Follow.findAll({
            where:
            {
                userId: userId,
                followerId: ownId}
        });
        //if there is the follow, there would be a return
        if (myFollow)
            return res.json(myFollow);
        //this will have the expected return:
        //if followed, there would be the relation
        //if not, there would not be anything
    }

}));



//potentially follow
//POST route
router.post('/:id(\\d+)/followingstatus',
    restoreUser,
    asyncHandler(async function(req,res){
        //this will be hit with "follow"
        //conditional render:
        //only render when 1) there is user and 2)there is no follow relation

        //currentUserId
        const { user } = req;
        //if not logged in, do not show the button
        if (!user) {
            return undefined;
        }
        //set current user
        const currentUser = user.toSafeObject()
        const ownId = currentUser.id;
        const userId = req.params.id;
        const newFollow = await db.Follow.create({userId: userId, followerId: ownId});
        return newFollow;
    }
    )
);

//DELETE route
//for unfollow
//ONLY render when there is already a relation
router.delete('/:id(\\d+)/followingstatus',
    restoreUser,
    asyncHandler(async function(req,res){
        const myFollow = await db.Follow.findAll({
            where:
            {
                userId: userId,
                followerId: ownId}
        });
        //case where there is no relation;
        if (!myFollow)
            return;
        //case where there is a relation
        const deletion = await db.Follow.destroy(myFollow);
        return deletion;
    }
    )
);

module.exports = router;
