const PostModel = require('./post');

const createPost = async ({ imageUrl, title, description, createdBy }) => {
  const newPost = await PostModel.create({
    imageUrl, title, description, createdBy
  });

  return newPost;
}

const getPosts = async ({ offset, limit }) => {
  // const posts = await PostModel.find().skip(offset).limit(limit);

  // example: offset 1, limit 10 => 1 - 10
  // example: offset 20, limit 6 => 20 - 25

  // const total = await PostModel.countDocuments();

  const [posts, total] = await Promise.all([
    PostModel.find().skip(offset).limit(limit),
    PostModel.countDocuments()
  ])

  // await một lần thôi => posts, total => aggregate
  return [posts, total];
}

module.exports = {
  createPost,
  getPosts
}