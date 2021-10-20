const asyncHandler = require('../middleware/asyncHandler');
const Post = require('../models/Post');

// @desc    CREATE NEW POST
// @route   POST /api/v1/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Add user to req.body;

  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    GET ALL POSTS
// @route   GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    data: posts,
    count: posts.length,
  });
});

// @desc    GET SINGLE POST
// @route   GET /api/v1/posts/id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(400).json({ success: false, error: error.message });

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    UPDATE POST
// @route   PUT /api/v1/posts/id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) return res.status(400).json({ success: false, error: error.message });

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    DELETE POST
// @route   DELETE /api/v1/posts/id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) return res.status(400).json({ success: false, error: error.message });

  res.status(200).json({
    success: true,
    data: {},
  });
});
