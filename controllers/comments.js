// @desc    GET ALL COMMENTS
// @route   GET /api/v1/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show call comments' });
};
