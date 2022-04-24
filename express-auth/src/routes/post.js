const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {verifyToken} = require('../middleware/auth');
const testVerifyToken = require('../middleware/verifyToken');
router.post('/posts', verifyToken, postController.createPost);
router.get('/posts', verifyToken,  postController.getPosts)
router.put('/posts/:id', verifyToken,  postController.updatePost);
router.delete('/posts/:id', verifyToken,  postController.deletePost);


module.exports = router;