const Post = require('../models/Post');
const logEvents = require('../helpers/logEvents');
const postController = {
    createPost: async (req, res) => {
        if(!req.body.title || !req.body.description) return res.status(400).json('Missing title or description!!');
        try {
            const post = new Post({
                title: req.body.title,
                description: req.body.description,
                user: req.userId
            });
            console.log(post);
            await post.save();
            return res.status(200).json({ post });
        } catch (error) {
            await logEvents(error.message, module.filename);
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find({user: req.userId});
            return res.status(200).json({ posts });
        } catch (error) {
            await logEvents(error.message, module.filename);
        }
    },
    updatePost: async (req, res) => {
        const id = req.params.id;
        try {
            const post = await Post.findByIdAndUpdate(id, req.body, {new: true});
            return res.status(200).json("Update post successfully")
        } catch (error) {
            await logEvents(error.message, module.filename);
        }
    },
    deletePost: async (req, res) => {
        const id = req.params.id;
        try {
            const post = await Post.findByIdAndDelete(id);
            return res.status(200).json("Delete post successfully")
        } catch (error) {
            await logEvents(error.message, module.filename);
        }
    }
}
module.exports = postController;