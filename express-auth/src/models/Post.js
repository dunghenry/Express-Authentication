const mongoose = require('mongoose');
const User = require('../models/User')
const Schema = mongoose.Schema;
const connectDBPost = require('../config/connectMultipleDB');
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Post =connectDBPost.model('Post', postSchema);

module.exports = Post;