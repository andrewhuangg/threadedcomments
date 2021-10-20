const asyncHandler = require('../middleware/asyncHandler');
const Comment = require('../models/Comment');

// @desc    GET ALL COMMENTS
// @route   GET /api/v1/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = Comment.find();

  res.status(200).json({
    success: true,
    data: comments,
    count: comments.length,
  });
});
