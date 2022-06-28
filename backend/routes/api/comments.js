
const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth,restoreUser } = require ("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models')

router.get('',asyncHandler(async function(req, res){
    return (`Test Route`);
}));

//=======comments===================


//READ
router.get('/forpost/:id(\\d+)',asyncHandler(async function(req, res) {
    const postId = req.params.id;
    console.log(`from get comment route ${postId}`);
    const comments = await db.Comment.findAll({
        where:{
            postId: postId
        },
        include:[
            {model: db.User,
            required:false}
        ]
    });
    if (comments)
        return res.json(comments);
    else
        return res.json();
}
));

//CREATE
router.post('/',asyncHandler(
    // requireAuth,
    // restoreUser,
    async function(req, res) {
    // const postId = req.params.id;
    // const { user } = req;
    // if (!user) {
    //     return Error;
    // }
    const newComment = await db.Comment.create(req.body);
    const savedComment = await newComment.save();
    console.log(`what we created: ${savedComment.toJSON()}`)
    return res.json(savedComment);
    }
));



//UPDATE
//OPTIONAL
router.put(
    '/:id(\\d+)/comments/:commentId(\\d+)',
    // requireAuth,
    // restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        const { user } = req;
        const currentUser = user.toSafeObject()
        const ownId = currentUser.id;

        const commentId = req.params.commentId;
        const comment = await db.commentId.findByPk(commentId);
        CheckPermissions(commentId, ownId)

        const id = await post.update(req.body);
        const updatedComment = await db.Comment.findByPk(id);
        return res.json(updatedComment);
    })
  );


//DELETE

router.delete(
    '/:commentId(\\d+)',
    // requireAuth,
    // restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        // const { user } = req;
        // const currentUser = user.toSafeObject()
        // const ownId = currentUser.id;

        const commentId = req.params.commentId;
        const id = await db. Comment.destroy({
            where: {id: commentId},
        });
        return res.json(commentId);
    }
    )
)


module.exports = router;
