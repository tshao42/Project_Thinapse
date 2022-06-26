const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const homeRouter = require ('./home.js')
const postRouter = require('./post.js')
const userRouter = require('./userpage.js');
const commentRouter = require('./comments.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

//home page
router.use('/', homeRouter);

//posts page
router.use('/posts', postRouter);

//users page
router.use('/userinfo', userRouter);
router.use('/comments', commentRouter);

module.exports = router;
