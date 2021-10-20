const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add some text'],
      maxlength: [100, 'Comment cannot be more than 100 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      default: null,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: true,
    },
    depth: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', CommentSchema);
