const express = require('express')
const Video = require('../models/video')
const Subscriber = require('../models/subscriber')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/video')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
  })

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    }
}).single("file")

router.post("/video/uploadfiles", upload, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/video/thumbnail", (req, res) => {

    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){

        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
});

router.post('/video/uploadVideo',auth, async (req, res) => {
    const video = new Video(req.body)

    try {
        await video.save()
        res.status(201).send(video)
    } catch (e) {
        res.send(e)
    }
})

router.get('/video', async(req, res) => {
    try {
        const video = await Video.find().populate('writer','name')
        res.send(video)
        
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/video/:id',async (req, res) => {
    const _id = req.params.id

    try {
        const video = await Video.findOne({ _id}).populate('writer')
        video.views =video.views+1
        video.save()

        if (!video) {
            return res.status(404).send()
        }

        res.send(video)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post("/video/SubscriptionVideos", (req, res) => {

    //Need to find all of the Users that I am subscribing to From Subscriber Collection 
    
    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo)
        })

        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
    })
});

router.post('/video/me', async (req,res) => {
    Video.find({ writer: req.body.id})
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})

router.post('/video/category', async (req,res) => {
    Video.find({ category: req.body.id})
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})

router.delete('/video', auth, async (req, res) => {
    Video.findOneAndDelete({ _id: req.body.id, writer: req.body.user })
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})

module.exports = router