const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth } = require ("../../utils/auth");
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
router.get('/:id(\\d+)/followingstatus', asyncHandler(async function(req,res){
    const userId = req.params.id;
    const ownId = req.user.id;
    console.log(`CHECKPOINT FOR FOLLOWINGSTATUS ${ownId}`)
    const myFollow = await db.Follow.findAll({
        where:
        {userId: userId,
         followerId: ownId}
    });
    return res.json(myFollow);

    //need to do it in conditional

}));



//potentially follow
//POST route


//DELETE route
//for unfollow












module.exports = router;
