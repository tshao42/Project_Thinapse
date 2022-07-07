const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postRouter = require('./post.js')
const commentRouter = require('./comments.js')
const followRouter = require('./follower.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

//posts page
router.use('/posts', postRouter);

//users page
router.use('/comments', commentRouter);

router.use('/follow', followRouter);

module.exports = router;
