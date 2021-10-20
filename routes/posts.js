const express = require('express');
const router = express.Router();
const { createPost, getPost, getPosts, updatePost, deletePost } = require('../controllers/posts');

const { authenticate } = require('../middleware/authenticate');

router.route('/id').get(getPost).put(authenticate, updatePost).delete(authenticate, deletePost);
router.route('/').post(authenticate, createPost).get(getPosts);

module.exports = router;
