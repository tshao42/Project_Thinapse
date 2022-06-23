const express = require('express');
const router = express.Router(); //create express router

//setting a cookie on the response with the name XSRF-TOKEN
//the return of the token would be the return of the req.csrfToken method
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

//for API
const apiRouter = require('./api');

router.use('/api', apiRouter);



//export router
module.exports = router;
