const express = require('express');
const router = express.Router();
const Like = require("../models/like");
const Dislike = require("../models/dislike");
const auth = require('../middleware/auth');


router.post("/like/getLikes", (req, res) => {

    let variable = { videoId: req.body.videoId }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})


router.post("/dislike/getDislikes", (req, res) => {

    let variable = { videoId: req.body.videoId }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


router.post("/like/upLike", (req, res) => {

    let variable = { videoId: req.body.videoId, userId: req.body.userId }

    const like = new Like(variable)

    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})

router.post("/dislike/upDisLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const disLike = new Dislike(variable)

    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });

        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})

router.post("/like/unLike", (req, res) => {

    let variable = { videoId: req.body.videoId, userId: req.body.userId }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

router.post("/dislike/unDisLike", (req, res) => {

    let variable = { videoId: req.body.videoId, userId: req.body.userId }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
})


module.exports = router;