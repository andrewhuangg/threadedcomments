const express = require('express');
const router = express.Router();
const { createPost, getPost, getPosts, updatePost, deletePost } = require('../controllers/posts');

router.route('/id').get(getPost).put(updatePost).delete(deletePost);
router.route('/').post(createPost).get(getPosts);

module.exports = router;
