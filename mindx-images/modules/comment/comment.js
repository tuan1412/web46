const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId // userId
    },
    post: {
      type: mongoose.Types.ObjectId // postId
    }
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model('comment', CommentSchema);
