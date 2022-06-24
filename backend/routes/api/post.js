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


//READ
router.get('/:id(\\d+)',asyncHandler(async function(req, res) {
    const postId = req.params.id;
    const post = await db.Post.findByPk(postId);
    if (post)
        return res.json(post);
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
    '/:id',
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
    '/:id',
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





module.exports = router;
