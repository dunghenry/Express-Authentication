const Post = require('../models/Post');
const logEvents = require('../helpers/logEvents');
const postController = {
    createPost: async (req, res) => {
        if(!req.body.title || !req.body.description) return res.status(400).json('Missing title or description!!');
        try {
            const post = new Post(req.body);
            console.log(post);
            await post.save();
            return res.status(200).json({ post });
        } catch (error) {
            await logEvents(error.message, module.filename);
        }
    }
}
module.exports = postController;