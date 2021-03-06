const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    writer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: String,
    },
    filePath : {
        type: String,
    },
    category: { 
        type: String
    },
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema)

module.exports = Video