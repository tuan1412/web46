const CommentModel = require('./comment');
const PostModel = require('../post/post');

const createComment = async ({ content, createdBy, postId }) => {
  const existedPost = await PostModel.findById(postId);

  if (!existedPost) throw new Error('Not found post');
  
  const newComment = await CommentModel.create({
    content,
    createdBy,
    post: postId
  });
  return newComment;
}

module.exports = {
  createComment
}