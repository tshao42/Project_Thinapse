const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth,restoreUser } = require ("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const { Result } = require('express-validator');
const Op = require('sequelize');

//================API for home page================
//GET
//TODO:
//need to fetch 5 latest pages*

//this is working
router.get('/', asyncHandler(async function(_req, res) {
    const posts = await db.Post.findAll({
        include:[{
            model: db.User,
            required:false
        }]
    })
    return res.json(posts);
}));

router.get('/users/:userId', asyncHandler(async function(req, res) {
    const userId = req.params.userId;
    const posts = await db.Post.findAll({
        where:{
            authorId: userId
        },
        include:[{
            model: db.User,
            required:false
        }]
    })
    return res.json(posts);
}));

router.get('/allfollowing/:userId', asyncHandler(async function(req,res){
    const userId = req.params.userId;
    const following = await db.Follow.findAll({
        raw: true,
        nest: true,
        where: {
            followerId: userId
        },
        attributes:['followingId'],
    });

    const insideFollowingObject=[];
    for (let i = 0 ; i < following.length; i ++){
        const { followingId } = following[i];
        insideFollowingObject.push(followingId);
    }

    console.log(insideFollowingObject);
    console.log(Array.isArray(insideFollowingObject));


    const feedPost = await db.Post.findAll({
        where:{
            authorId:insideFollowingObject
        },
        include:[{
            model: db.User,
            required: true
        }]
    })


    // let followings = [];
    // following.forEach((following)=>followings.push(following[followingId]));
    return res.json(feedPost);

}));
//READ
//this is working
router.get('/:id(\\d+)',asyncHandler(async function(req, res) {
    const postId = req.params.id;
    const post = await db.Post.findByPk(postId,{
        include:[{
            model: db.User,
            required:false
        }]
    });

    if (post){
        return res.json(post);
    }
    else
        return res.redirect('/');
}
));

//CREATE
//IT SHOULD BE WORKING
router.post(
    '/',
    // requireAuth,
    // restoreUser,
    asyncHandler(async function (req, res) {
    const id = await db.Post.build(req.body);
    const newPost = await id.save();
    res.json(newPost);
})
);

//error handling
// const CheckPermissions = (post, currentUserId)=>{
// if (post.authorId !== currentUserId) {
//     const err = new Error('Illegal operation.');
//     err.status = 403; // Forbidden
//     throw err;
// }
// };
//UPDATE
//fixed
router.put(
    '/:id(\\d+)',
    // requireAuth,
    // restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        // const { user } = req;
        // const currentUser = user.toSafeObject()
        // const ownId = currentUser.id;

        const postId = req.params.id;
        const post = await db.Post.findByPk(postId)
        await post.update(req.body);
        const updatedPost = await db.Post.findByPk(postId,{
            include:[{
                model: db.User,
                required:false
            }]
        });
        return res.json(updatedPost);
    })
  );


//DELETE

router.delete(
    '/:id(\\d+)',
    // requireAuth,
    // restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        //get params id
        const postId = req.params.id;
        await db.Post.destroy({
            where: {id: postId},
        });
        return res.json(postId);
    }
    )
)






module.exports = router;
