const express = require('express');
const Comment = require('../models/comment');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post("/comment/saveComment", (req, res) => {

    const comment = new Comment(req.body);

    comment.save((err, result) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, result })
    })

});

router.post("/comment/getComments", async(req, res) => {
    Comment.find({ "postId": req.body.videoId })
        .populate('writer','name')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).send(comments)
        })

});

module.exports = router;