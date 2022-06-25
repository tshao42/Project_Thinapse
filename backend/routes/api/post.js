const express = require('express');
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth,restoreUser } = require ("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const { Result } = require('express-validator');

//================API for home page================
//GET
//TODO:
//need to fetch 5 latest pages*


router.get('/', asyncHandler(async function(_req, res) {
    const posts = await db.Post.findAll({
        include:[{
            model: db.User,
            required:false
        }]
    })
    console.log(posts);
    return res.json(posts);
}));


//READ
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
router.post('/',asyncHandler(requireAuth,
    restoreUser,
    async function(req, res) {
    const { user } = req;
    //if not logged in, do not show the button
    if (!user) {
        return Error;
    }
    const id = await db.Post.create(req.body);
    return res.redirect(`${req.baseUrl}.${id}`);
}
));

//error handling
const CheckPermissions = (post, currentUserId)=>{
if (post.authorId !== currentUserId) {
    const err = new Error('Illegal operation.');
    err.status = 403; // Forbidden
    throw err;
}
};
//UPDATE
router.put(
    '/:id(\\d+)',
    requireAuth,
    restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        const { user } = req;
        const currentUser = user.toSafeObject()
        const ownId = currentUser.id;

        const postId = req.params.id;
        const post = await db.Post.findByPk(postId);
        CheckPermissions(post, ownId)

        const id = await post.update(req.body);
        const updatedPost = await db.Post.findByPk(id);
        return res.json(updatedPost);

    })
  );


//DELETE

router.delete(
    '/:id(\\d+)',
    requireAuth,
    restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        const { user } = req;
        const currentUser = user.toSafeObject()
        const ownId = currentUser.id;

        const postId = req.params.id;
        const post = await db.Post.findByPk(postId);
        CheckPermissions(post, ownId)
        const id = await db.Post.destroy(post);
        return res.json({id});
    }
    )
)


//=======comments


//READ
router.get('/:id(\\d+)/comments',asyncHandler(async function(req, res) {
    const postId = req.params.id;
    const comments = await db.Comment.findAll({
        where:{
            postId: postId
        }
    });
    if (comments)
        return res.json(post);
    else
        return res.redirect('/');
}
));

//CREATE
router.post('/:id(\\d+)/comments',asyncHandler(requireAuth,
    restoreUser,
    async function(req, res) {
    const postId = req.params.id;
    const { user } = req;
    if (!user) {
        return Error;
    }
    const id = await db.Comment.create(req.body);
    return res.json(id);
}
));



//UPDATE
router.put(
    '/:id(\\d+)/comments/:commentId(\\d+)',
    requireAuth,
    restoreUser,
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
    '/:id(\\d+)/comments/:commentId(\\d+)',
    requireAuth,
    restoreUser,
    asyncHandler(async function (req, res) {
        //user Id
        const { user } = req;
        const currentUser = user.toSafeObject()
        const ownId = currentUser.id;

        const commentId = req.params.id;
        const comment = await db.Post.findByPk(commentId);
        CheckPermissions(comment, ownId)
        const id = await db. Comment.destroy(comment);
        return res.json({id});
    }
    )
)





module.exports = router;
