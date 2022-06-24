const express = require('express');
const asyncHandler = require ("express-async-handler");

//database
const db = require('../../db/models')
const router = express.Router();



//================API for home page================
//GET
//TODO:
//need to fetch 5 latest pages*


router.get('/', asyncHandler(async function(_req, res) {
    console.log("Hit API Route!");
    const posts = await db.Post.findAll(); //need to do limit
   return res.json(posts);
}));







module.exports = router;
